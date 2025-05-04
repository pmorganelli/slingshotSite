using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BallMovement : MonoBehaviour
{
    public string ballType = "default";
    public GameObject sling;
    public GameObject trajectoryDotPrefab;
    public int numberOfDots = 15;
    public float dotSpacing = 0.1f;

    public bool keyboardMode = false;

    private List<GameObject> dots;
    private Sling slingBehavior;
    private bool isPressed;
    private bool hasFired = false;
    private Rigidbody2D rb;
    private SpringJoint2D sj;
    private LineRenderer lr;
    private float releaseDelay;
    private float maxDragDistance = 1.75f;
    private Rigidbody2D slingRb;
    private TrailRenderer tr;
    private AudioSource audioSource;

    private void Awake()
    {
        // Handle sling reference if not set by prefab instantiation
        if (sling == null)
        {
            GameObject foundSling = GameObject.FindWithTag("Sling");
            if (foundSling != null)
            {
                sling = foundSling;
            }
        }

        if (sling != null)
        {
            slingBehavior = sling.GetComponent<Sling>();
            if (slingBehavior != null)
            {
                slingRb = sling.GetComponent<Rigidbody2D>();
            }
            else
            {
                Debug.LogWarning("[Ball] SlingBehavior not found on sling object.");
            }
        }
        else
        {
            Debug.LogWarning("[Ball] Sling not assigned or found.");
        }

        // Load keyboard mode from global toggle
        keyboardMode = GameHandler_PauseMenu.keyboardModeEnabled;
        hasFired = false;

        rb = GetComponent<Rigidbody2D>();
        sj = GetComponent<SpringJoint2D>();
        lr = GetComponent<LineRenderer>();
        audioSource = GetComponent<AudioSource>();
        tr = GetComponent<TrailRenderer>();

        lr.enabled = false;
        tr.enabled = false;

        releaseDelay = 1 / (sj.frequency * 4);

        // Setup trajectory dots
        dots = new List<GameObject>();
        for (int i = 0; i < numberOfDots; i++)
        {
            GameObject dot = Instantiate(trajectoryDotPrefab);
            dot.transform.localScale = Vector3.one * 0.1f;
            dot.SetActive(false);
            dots.Add(dot);
        }
    }

    void Update()
    {
        if (keyboardMode && !hasFired)
        {
            if (slingRb != null) rb.position = slingRb.position;
            rb.isKinematic = true;
            ShowKeyboardTrajectory();

            if (Input.GetKeyDown(KeyCode.Space))
            {
                LaunchFromKeyboard();
            }
        }
        else if (isPressed)
        {
            DragBall();
            ShowTrajectory();
        }
    }

    private void DragBall()
    {
        if (slingRb == null) return;

        SetLineRendererPositions();
        Vector2 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        float distance = Vector2.Distance(mousePos, slingRb.position);

        Vector2 dragPos = (distance > maxDragDistance)
            ? slingRb.position + (mousePos - slingRb.position).normalized * maxDragDistance * GameHandler.SLING_force_multiplier
            : mousePos;

        rb.position = dragPos;
    }

    private void SetLineRendererPositions()
    {
        if (slingRb == null) return;

        lr.SetPositions(new Vector3[] { rb.position, slingRb.position });
    }

    private void OnMouseDown()
    {
        if (keyboardMode || hasFired) return;

        isPressed = true;
        rb.isKinematic = true;
        lr.enabled = true;
    }

    private void OnMouseUp()
    {
        if (keyboardMode || hasFired) return;

        isPressed = false;
        rb.isKinematic = false;
        lr.enabled = false;
        HideTrajectory();

        slingBehavior?.reload();
        StartCoroutine(Release());
    }

    private IEnumerator Release()
    {
        audioSource.Play();
        yield return new WaitForSeconds(releaseDelay);

        sj.enabled = false;
        tr.enabled = true;

        yield return new WaitForSeconds(10f);
        destroyBall();
    }

    public void destroyBall()
    {
        Destroy(gameObject);
    }

    private void ShowTrajectory()
    {
        if (slingRb == null) return;

        Vector2 launchPos = rb.position;
        Vector2 force = (slingRb.position - rb.position).normalized *
                        Mathf.Min(Vector2.Distance(rb.position, slingRb.position), maxDragDistance) *
                        (sj.frequency * 4f);

        float timeStep = dotSpacing;
        for (int i = 0; i < numberOfDots; i++)
        {
            float t = i * timeStep;
            Vector2 pos = launchPos + force * t;
            dots[i].transform.position = pos;
            dots[i].SetActive(true);
        }
    }

    private void ShowKeyboardTrajectory()
    {
        if (slingRb == null) return;

        Vector2 mouseWorldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        Vector2 dir = slingRb.position - mouseWorldPos;
        Vector2 force = dir.normalized * Mathf.Min(dir.magnitude, maxDragDistance) * (sj.frequency * 4f);

        float timeStep = dotSpacing;
        Vector2 launchPos = slingRb.position;

        for (int i = 0; i < numberOfDots; i++)
        {
            float t = i * timeStep;
            Vector2 pos = launchPos + force * t;
            dots[i].transform.position = pos;
            dots[i].SetActive(true);
        }
    }

    private void LaunchFromKeyboard()
    {
        if (hasFired || slingRb == null) return;

        hasFired = true;

        Vector2 mouseWorldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        Vector2 dir = slingRb.position - mouseWorldPos;
        Vector2 force = dir.normalized * Mathf.Min(dir.magnitude, maxDragDistance) * (sj.frequency * 4f);

        rb.isKinematic = false;
        sj.enabled = false;
        tr.enabled = true;

        rb.AddForce(force, ForceMode2D.Impulse);
        audioSource.Play();
        HideTrajectory();

        slingBehavior?.reload();
        StartCoroutine(DestroyAfterDelay());
    }

    private IEnumerator DestroyAfterDelay()
    {
        yield return new WaitForSeconds(10f);
        destroyBall();
    }

    private void HideTrajectory()
    {
        foreach (GameObject dot in dots)
        {
            dot.SetActive(false);
        }
    }
}
