import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * ============================================================================
 * Efficura - All-In-One Master Laptop Showcase for Framer
 * ============================================================================
 *
 * Single code component containing all 4 rotating homepage product screens:
 * 1. System of Record (Salesforce Tower, map pin, headline metric counters)
 * 2. Deal Origination (Outlook web client, animated cursor, deal creation)
 * 3. Servicing & Reporting (Approved snapshot, changes donut, trendline)
 * 4. Document Chat (Credit memo PDF viewer, live question typing, Effi AI answer)
 *
 * @framerIntrinsicWidth 840
 * @framerIntrinsicHeight 540
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */

interface EfficuraMasterShowcaseProps {
    style?: React.CSSProperties
    screenMode?:
        | "Auto Cycle"
        | "1. System of Record"
        | "2. Outlook Deal Origination"
        | "3. Servicing & Reporting"
        | "4. Document Chat"
    cycleDuration?: number
    floating?: boolean
}

const BRAND_GREEN = "#3a5a40"
const OUTLOOK_BLUE = "#0f6cbd"

/* ------------------------------------------------------------------ */
/* Helper: Self-contained Animated CountUp Number                     */
/* ------------------------------------------------------------------ */
function CountUp({
    to,
    delay = 0,
    duration = 1.2,
    format = (v: number) => Math.round(v).toLocaleString("en-GB"),
}: {
    to: number
    delay?: number
    duration?: number
    format?: (v: number) => string
}) {
    const [value, setValue] = React.useState(0)

    React.useEffect(() => {
        setValue(0)
        let start: number | null = null
        let rafId: number
        const timer = setTimeout(() => {
            const step = (timestamp: number) => {
                if (!start) start = timestamp
                const progress = Math.min(
                    (timestamp - start) / (duration * 1000),
                    1
                )
                const ease = 1 - (1 - progress) * (1 - progress)
                setValue(ease * to)
                if (progress < 1) {
                    rafId = requestAnimationFrame(step)
                }
            }
            rafId = requestAnimationFrame(step)
        }, delay * 1000)

        return () => {
            clearTimeout(timer)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [to, delay, duration])

    return <>{format(value)}</>
}

/* ------------------------------------------------------------------ */
/* Screen 1: System of Record (AssetMock)                             */
/* ------------------------------------------------------------------ */
function AssetScreen() {
    return (
        <div
            style={{
                flex: 1,
                position: "relative",
                background: "linear-gradient(135deg, #1e293b 0%, #090d16 100%)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 14,
                boxSizing: "border-box",
            }}
        >
            {/* Skyline Silhouette */}
            <svg
                viewBox="0 0 500 250"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.25,
                    objectFit: "cover",
                }}
            >
                <path
                    d="M 220 250 L 235 50 L 265 50 L 280 250 Z"
                    fill="#38bdf8"
                />
                <path
                    d="M 150 250 L 170 110 L 210 110 L 220 250 Z"
                    fill="#1e293b"
                />
                <path
                    d="M 280 250 L 295 80 L 340 80 L 355 250 Z"
                    fill="#1e293b"
                />
            </svg>

            {/* Status Badge */}
            <div
                style={{
                    alignSelf: "flex-end",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: 9999,
                    padding: "2px 8px",
                    fontSize: 7,
                    fontWeight: 600,
                    color: "#18181b",
                    zIndex: 2,
                }}
            >
                <span
                    style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: "#10b981",
                    }}
                />
                In use
            </div>

            {/* Location Pin */}
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "28%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 2,
                }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: 4,
                        padding: "2px 6px",
                        fontSize: 7,
                        fontWeight: 600,
                        color: "#18181b",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                >
                    Salesforce Tower
                </div>
                <svg
                    viewBox="0 0 24 24"
                    style={{
                        width: 14,
                        height: 14,
                        marginTop: 1,
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                    }}
                >
                    <path
                        d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"
                        fill="#ffffff"
                    />
                    <circle cx="12" cy="9" r="2.5" fill={BRAND_GREEN} />
                </svg>
            </div>

            {/* Headline Metrics */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                }}
            >
                <div>
                    <h3
                        style={{
                            margin: 0,
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#ffffff",
                        }}
                    >
                        Salesforce Tower
                    </h3>
                    <p
                        style={{
                            margin: "1px 0 0",
                            fontSize: 7,
                            color: "#a1a1aa",
                        }}
                    >
                        San Francisco, CA
                    </p>
                </div>

                <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                    <div>
                        <div
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#ffffff",
                            }}
                        >
                            $<CountUp to={1400000000} delay={0.2} />
                        </div>
                        <div style={{ fontSize: 6, color: "#a1a1aa" }}>
                            Market value
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#ffffff",
                            }}
                        >
                            <CountUp
                                to={6.5}
                                delay={0.3}
                                format={(v) => `${v.toFixed(2)}%`}
                            />
                        </div>
                        <div style={{ fontSize: 6, color: "#a1a1aa" }}>
                            Net initial yield
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#ffffff",
                            }}
                        >
                            <CountUp to={1420079} delay={0.4} /> Sq Ft
                        </div>
                        <div style={{ fontSize: 6, color: "#a1a1aa" }}>Area</div>
                    </div>
                    <div>
                        <div
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#ffffff",
                            }}
                        >
                            <CountUp
                                to={78}
                                delay={0.5}
                                format={(v) => `${Math.round(v)}%`}
                            />
                        </div>
                        <div style={{ fontSize: 6, color: "#a1a1aa" }}>
                            Occupancy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Screen 2: Outlook Deal Origination (OutlookMock)                   */
/* ------------------------------------------------------------------ */
function OutlookScreen() {
    const [phase, setPhase] = React.useState(0)

    React.useEffect(() => {
        setPhase(0)
        const t1 = setTimeout(() => setPhase(1), 1200)
        const t2 = setTimeout(() => setPhase(2), 2400)
        const t3 = setTimeout(() => setPhase(3), 2900)
        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
        }
    }, [])

    const isCursorMoved = phase >= 1
    const isClicked = phase >= 2
    const isSent = phase >= 3

    return (
        <div
            style={{
                display: "flex",
                flex: 1,
                minHeight: 0,
                position: "relative",
                backgroundColor: "#ffffff",
            }}
        >
            {/* Outlook Module Rail */}
            <div
                style={{
                    width: 26,
                    borderRight: "1px solid #f4f4f5",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    paddingTop: 8,
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: 2,
                        backgroundColor: `${OUTLOOK_BLUE}20`,
                        color: OUTLOOK_BLUE,
                        display: "grid",
                        placeItems: "center",
                        fontSize: 7,
                        fontWeight: 700,
                    }}
                >
                    ✉
                </div>
                <div style={{ fontSize: 7, color: "#a1a1aa" }}>📅</div>
                <div style={{ fontSize: 7, color: "#a1a1aa" }}>👥</div>
            </div>

            {/* Folder Pane */}
            <div
                style={{
                    width: 70,
                    backgroundColor: "#fafafa",
                    borderRight: "1px solid #f4f4f5",
                    padding: "6px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flexShrink: 0,
                    fontSize: 7,
                }}
            >
                <div
                    style={{
                        fontWeight: 600,
                        color: "#27272a",
                        marginBottom: 2,
                    }}
                >
                    Favourites
                </div>
                <div
                    style={{
                        padding: "2px 4px",
                        borderRadius: 3,
                        backgroundColor: "#d5e4f2",
                        fontWeight: 600,
                        color: OUTLOOK_BLUE,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>Inbox</span>
                    <span>22</span>
                </div>
                <div style={{ padding: "2px 4px", color: "#71717a" }}>Sent</div>
                <div style={{ padding: "2px 4px", color: "#71717a" }}>
                    Drafts [5]
                </div>
            </div>

            {/* Message List */}
            <div
                style={{
                    width: 120,
                    borderRight: "1px solid #e4e4e7",
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        padding: "4px 6px",
                        borderBottom: "1px solid #f4f4f5",
                        fontSize: 7,
                        fontWeight: 600,
                        color: "#18181b",
                    }}
                >
                    Focused
                </div>
                <div
                    style={{
                        padding: "4px 6px",
                        backgroundColor: "#f4f4f5",
                        borderLeft: `2px solid ${OUTLOOK_BLUE}`,
                        fontSize: 7,
                    }}
                >
                    <div style={{ fontWeight: 600, color: "#18181b" }}>
                        Ed Lawson
                    </div>
                    <div
                        style={{
                            color: "#27272a",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        Harbour Yard - facility pack
                    </div>
                </div>
                <div style={{ padding: "4px 6px", fontSize: 7 }}>
                    <div style={{ fontWeight: 600, color: "#71717a" }}>
                        Marcus Webb
                    </div>
                    <div style={{ color: "#a1a1aa" }}>Granary Wharf</div>
                </div>
            </div>

            {/* Reading Pane */}
            <div
                style={{
                    flex: 1,
                    padding: "8px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    minWidth: 0,
                }}
            >
                <h4
                    style={{
                        margin: 0,
                        fontSize: 9,
                        fontWeight: 600,
                        color: "#18181b",
                    }}
                >
                    Harbour Yard - facility pack
                </h4>
                <div style={{ fontSize: 6, color: "#a1a1aa" }}>
                    From: Ed Lawson &lt;ed.lawson@excap.example&gt;
                </div>
                <div
                    style={{
                        fontSize: 7,
                        lineHeight: 1.4,
                        color: "#52525b",
                        marginTop: 4,
                    }}
                >
                    <p style={{ margin: "0 0 2px" }}>Hi team,</p>
                    <p style={{ margin: "0 0 2px" }}>
                        Please see the attached pack for Harbour Yard:
                    </p>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            paddingLeft: 4,
                        }}
                    >
                        <div>• 120 Key Hotel</div>
                        <div>
                            • <strong>£48.5m</strong> senior facility
                        </div>
                        <div>
                            • <strong>£83.0m</strong> GDV · 58.4% LTV
                        </div>
                    </div>
                </div>
            </div>

            {/* Labrador Apps Panel */}
            <div
                style={{
                    width: 120,
                    borderLeft: "1px solid #e4e4e7",
                    backgroundColor: "#ffffff",
                    padding: "8px 6px",
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 7,
                        fontWeight: 600,
                        color: "#18181b",
                        marginBottom: 8,
                    }}
                >
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: 2,
                            backgroundColor: BRAND_GREEN,
                            color: "white",
                            display: "grid",
                            placeItems: "center",
                            fontSize: 6,
                            fontWeight: 700,
                        }}
                    >
                        E
                    </div>
                    Send to labrador
                </div>

                <div
                    style={{
                        padding: "5px 6px",
                        borderRadius: 3,
                        backgroundColor: isClicked ? BRAND_GREEN : "#18181b",
                        color: "#ffffff",
                        fontSize: 7,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform:
                            phase === 2 ? "scale(0.95)" : "scale(1)",
                        transition:
                            "transform 0.15s ease, background-color 0.2s ease",
                    }}
                >
                    {isSent ? "✓ Sent!" : "+ Create new deal"}
                </div>

                <div
                    style={{
                        marginTop: 8,
                        padding: "3px 4px",
                        borderRadius: 3,
                        backgroundColor: "rgba(58, 90, 64, 0.12)",
                        border: `1px solid rgba(58, 90, 64, 0.3)`,
                        color: BRAND_GREEN,
                        fontSize: 6,
                        fontWeight: 600,
                        opacity: isSent ? 1 : 0,
                        transition: "opacity 0.3s ease",
                    }}
                >
                    ✓ Deal created: Harbour Yard
                </div>
            </div>

            {/* Animated Cursor */}
            <div
                style={{
                    position: "absolute",
                    zIndex: 20,
                    pointerEvents: "none",
                    left: isCursorMoved ? "88%" : "22%",
                    top: isCursorMoved ? "16%" : "44%",
                    transform:
                        phase === 2 ? "scale(0.85)" : "scale(1)",
                    transition:
                        "left 1.1s cubic-bezier(0.22, 1, 0.36, 1), top 1.1s cubic-bezier(0.22, 1, 0.36, 1), transform 0.15s ease",
                }}
            >
                <svg
                    viewBox="0 0 24 24"
                    style={{
                        width: 14,
                        height: 14,
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                    }}
                >
                    <path
                        d="M4 2l15 11-7 1 4 7.5-3 1.5-4-7.5L4 20V2z"
                        fill="#18181b"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Screen 3: Servicing & Reporting (ReportingMock)                    */
/* ------------------------------------------------------------------ */
function ReportingScreen() {
    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "10px 14px",
                backgroundColor: "#ffffff",
                boxSizing: "border-box",
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #f4f4f5",
                    paddingBottom: 6,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                        style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#18181b",
                        }}
                    >
                        Reporting
                    </span>
                    <span style={{ fontSize: 8, color: "#a1a1aa" }}>
                        APR 2026
                    </span>
                    <span
                        style={{
                            borderRadius: 9999,
                            backgroundColor: "#ecfdf5",
                            color: "#059669",
                            fontSize: 6,
                            fontWeight: 600,
                            padding: "1px 6px",
                            border: "1px solid #a7f3d0",
                        }}
                    >
                        ✓ Approved · 29 Jun
                    </span>
                </div>
                <div
                    style={{
                        fontSize: 7,
                        fontWeight: 600,
                        backgroundColor: "#18181b",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: 3,
                    }}
                >
                    + Add snapshot
                </div>
            </div>

            {/* Middle Section: Changes Donut + Metric Stats */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 8,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                        style={{
                            position: "relative",
                            width: 44,
                            height: 44,
                            display: "grid",
                            placeItems: "center",
                        }}
                    >
                        <svg
                            viewBox="0 0 36 36"
                            style={{
                                width: "100%",
                                height: "100%",
                                transform: "rotate(-90deg)",
                            }}
                        >
                            <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="none"
                                stroke="#588157"
                                strokeWidth="5"
                                strokeDasharray="50 100"
                            />
                            <circle
                                cx="18"
                                cy="18"
                                r="14"
                                fill="none"
                                stroke="#5b84ae"
                                strokeWidth="5"
                                strokeDasharray="40 100"
                                strokeDashoffset="-50"
                            />
                        </svg>
                        <span
                            style={{
                                position: "absolute",
                                fontSize: 9,
                                fontWeight: 700,
                                color: "#18181b",
                            }}
                        >
                            <CountUp to={30} delay={0.2} />
                        </span>
                    </div>
                    <div>
                        <div
                            style={{
                                fontSize: 8,
                                fontWeight: 600,
                                color: "#18181b",
                            }}
                        >
                            30 changes
                        </div>
                        <div style={{ fontSize: 6, color: "#a1a1aa" }}>
                            Since last report
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 16 }}>
                    <div>
                        <div style={{ fontSize: 6, color: "#a1a1aa" }}>
                            Valuation
                        </div>
                        <div
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#18181b",
                            }}
                        >
                            £<CountUp to={106800000} delay={0.3} />
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 6, color: "#a1a1aa" }}>
                            Senior LTV
                        </div>
                        <div
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#18181b",
                            }}
                        >
                            <CountUp
                                to={35.58}
                                delay={0.4}
                                format={(v) => `${v.toFixed(2)}%`}
                            />
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 6, color: "#a1a1aa" }}>
                            Net Rental
                        </div>
                        <div
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#18181b",
                            }}
                        >
                            £<CountUp to={1385527} delay={0.5} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Self-drawing SVG Trendline Chart */}
            <div style={{ marginTop: 10 }}>
                <div
                    style={{
                        fontSize: 7,
                        fontWeight: 600,
                        color: "#71717a",
                        marginBottom: 4,
                    }}
                >
                    Key Metrics Trend
                </div>
                <div
                    style={{
                        position: "relative",
                        height: 50,
                        borderBottom: "1px solid #f4f4f5",
                    }}
                >
                    <svg
                        viewBox="0 0 500 100"
                        preserveAspectRatio="none"
                        style={{
                            width: "100%",
                            height: "100%",
                            overflow: "visible",
                        }}
                    >
                        <path
                            d="M 0 90 C 150 90, 200 20, 270 20 C 340 20, 390 60, 500 50"
                            fill="none"
                            stroke="#18181b"
                            strokeWidth="2.5"
                        />
                    </svg>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 6,
                        color: "#a1a1aa",
                        marginTop: 2,
                    }}
                >
                    <span>APR 2025</span>
                    <span>JUL 2025</span>
                    <span>OCT 2025</span>
                    <span>JAN 2026</span>
                    <span>APR 2026</span>
                </div>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Screen 4: Data Room Document Chat (DocChatMock)                    */
/* ------------------------------------------------------------------ */
function DocChatScreen() {
    const [step, setStep] = React.useState(0)
    const [typed, setTyped] = React.useState("")
    const question = "What's the market value and current senior LTV?"

    React.useEffect(() => {
        setStep(0)
        setTyped("")

        // Step 1: Type question character-by-character
        let charIdx = 0
        const typeTimer = setInterval(() => {
            charIdx += 3
            setTyped(question.slice(0, charIdx))
            if (charIdx >= question.length) {
                clearInterval(typeTimer)
                setStep(1)
            }
        }, 40)

        // Step 2: Answer generated & document highlighted
        const answerTimer = setTimeout(() => {
            setStep(2)
        }, 2200)

        return () => {
            clearInterval(typeTimer)
            clearTimeout(answerTimer)
        }
    }, [])

    return (
        <div
            style={{
                display: "flex",
                flex: 1,
                minHeight: 0,
                backgroundColor: "#ffffff",
            }}
        >
            {/* Left Chat Pane */}
            <div
                style={{
                    width: "50%",
                    borderRight: "1px solid #e4e4e7",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        fontSize: 7,
                        fontWeight: 600,
                        color: "#71717a",
                        marginBottom: 4,
                    }}
                >
                    Data Room / Credit Memo (Apr 2026).pdf
                </div>

                {/* Conversation bubbles */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                        margin: "auto 0 8px 0",
                    }}
                >
                    {typed && (
                        <div
                            style={{
                                alignSelf: "flex-end",
                                backgroundColor: "#18181b",
                                color: "white",
                                fontSize: 7,
                                padding: "4px 8px",
                                borderRadius: "8px 8px 2px 8px",
                                maxWidth: "90%",
                            }}
                        >
                            {typed}
                        </div>
                    )}

                    {step >= 2 && (
                        <div
                            style={{
                                alignSelf: "flex-start",
                                backgroundColor: "#fafafa",
                                border: "1px solid #e4e4e7",
                                color: "#27272a",
                                fontSize: 7,
                                lineHeight: 1.4,
                                padding: "5px 8px",
                                borderRadius: "8px 8px 8px 2px",
                                maxWidth: "95%",
                            }}
                        >
                            Granary Wharf Estate is valued at{" "}
                            <strong>£106.8m</strong>. With £38m senior debt, the
                            senior LTV is <strong>35.58%</strong>.
                            <div
                                style={{
                                    marginTop: 4,
                                    display: "flex",
                                    gap: 4,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 6,
                                        backgroundColor: "#f4f4f5",
                                        padding: "1px 4px",
                                        borderRadius: 3,
                                        color: "#71717a",
                                    }}
                                >
                                    📄 Valuation p.3
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Composer */}
                <div
                    style={{
                        border: "1px solid #e4e4e7",
                        borderRadius: 6,
                        padding: "4px 6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#ffffff",
                    }}
                >
                    <span style={{ fontSize: 6, color: "#a1a1aa" }}>
                        {typed ? "" : "Ask a question about this document…"}
                    </span>
                    <span
                        style={{
                            fontSize: 6,
                            fontWeight: 600,
                            backgroundColor: BRAND_GREEN,
                            color: "white",
                            padding: "2px 6px",
                            borderRadius: 3,
                        }}
                    >
                        Ask
                    </span>
                </div>
            </div>

            {/* Right PDF Document Pane */}
            <div
                style={{
                    width: "50%",
                    backgroundColor: "#f4f4f5",
                    padding: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        width: "85%",
                        height: "92%",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        borderRadius: 3,
                        padding: "8px 10px",
                        fontSize: 6,
                        color: "#52525b",
                        lineHeight: 1.4,
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    <div
                        style={{
                            fontWeight: 700,
                            color: "#18181b",
                            fontSize: 8,
                        }}
                    >
                        ALDERCOTT CAPITAL
                    </div>
                    <div
                        style={{
                            fontWeight: 600,
                            color: BRAND_GREEN,
                            fontSize: 6,
                        }}
                    >
                        CREDIT MEMO: GRANARY WHARF
                    </div>
                    <div
                        style={{
                            height: 1,
                            backgroundColor: BRAND_GREEN,
                            margin: "2px 0",
                        }}
                    />
                    <p style={{ margin: 0 }}>
                        Executive Summary: Arrangement of senior facility
                        secured against Granary Wharf Estate.
                    </p>
                    <div
                        style={{
                            padding: "3px 4px",
                            borderRadius: 2,
                            backgroundColor:
                                step >= 2
                                    ? "rgba(58, 90, 64, 0.15)"
                                    : "transparent",
                            border:
                                step >= 2
                                    ? `1px solid ${BRAND_GREEN}`
                                    : "1px solid transparent",
                            transition:
                                "background-color 0.4s ease, border-color 0.4s ease",
                        }}
                    >
                        Independent valuation of <strong>£106.8m</strong> at
                        April 2026. Senior debt drawn £38.0m, senior LTV is{" "}
                        <strong>35.58%</strong>.
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* Master Showcase Component                                          */
/* ------------------------------------------------------------------ */

export default function EfficuraMasterShowcase(
    props: EfficuraMasterShowcaseProps
) {
    const {
        style,
        screenMode = "Auto Cycle",
        cycleDuration = 6.5,
        floating = true,
    } = props

    const [activeScreenIndex, setActiveScreenIndex] = React.useState(0)

    // Mode determination
    const isAuto = screenMode === "Auto Cycle"
    const pinnedIndex =
        screenMode === "1. System of Record"
            ? 0
            : screenMode === "2. Outlook Deal Origination"
            ? 1
            : screenMode === "3. Servicing & Reporting"
            ? 2
            : screenMode === "4. Document Chat"
            ? 3
            : null

    const currentScreen =
        pinnedIndex !== null ? pinnedIndex : activeScreenIndex

    React.useEffect(() => {
        if (!isAuto) return
        const interval = setInterval(() => {
            setActiveScreenIndex((prev) => (prev + 1) % 4)
        }, cycleDuration * 1000)
        return () => clearInterval(interval)
    }, [isAuto, cycleDuration])

    const screenTitles = [
        "labrador - Salesforce Tower",
        "outlook.office.com/mail",
        "labrador - Granary Wharf (Leeds) - Reporting",
        "labrador - Granary Wharf (Leeds) - Data Room",
    ]

    return (
        <div
            style={{
                ...style,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                minHeight: 480,
                padding: 16,
                boxSizing: "border-box",
                background: "transparent",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            {/* Laptop Bezel */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 780,
                    backgroundColor: "#0e0e11",
                    borderRadius: "12px 12px 4px 4px",
                    padding: "10px 10px 8px 10px",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                    boxSizing: "border-box",
                }}
            >
                {/* Camera dot */}
                <div
                    style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        backgroundColor: "#27272a",
                        margin: "0 auto 6px auto",
                    }}
                />

                {/* Laptop Screen Display */}
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 10",
                        backgroundColor: "#ffffff",
                        borderRadius: "6px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Window Header Bar */}
                    <div
                        style={{
                            height: 28,
                            backgroundColor: "#ffffff",
                            borderBottom: "1px solid #f4f4f5",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 10px",
                            flexShrink: 0,
                            position: "relative",
                        }}
                    >
                        <div style={{ display: "flex", gap: 5 }}>
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor: "#71717a",
                                }}
                            />
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor: "#71717a",
                                }}
                            />
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor: "#71717a",
                                }}
                            />
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontSize: 9,
                                color: "#71717a",
                                border: "1px solid #e4e4e7",
                                borderRadius: 4,
                                padding: "1px 8px",
                            }}
                        >
                            {screenTitles[currentScreen]}
                        </div>
                    </div>

                    {/* Sub-header Navigation (for Labrador screens) */}
                    {currentScreen !== 1 && (
                        <div
                            style={{
                                height: 24,
                                backgroundColor: "#ffffff",
                                borderBottom: "1px solid #f4f4f5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "0 10px",
                                fontSize: 8,
                                color: "#71717a",
                                flexShrink: 0,
                            }}
                        >
                            <div style={{ display: "flex", gap: 4 }}>
                                <span>Home</span>
                                <span>/</span>
                                <span>labrador</span>
                                <span>/</span>
                                <span
                                    style={{
                                        fontWeight: 600,
                                        color: "#18181b",
                                    }}
                                >
                                    {currentScreen === 0
                                        ? "Salesforce Tower"
                                        : "Granary Wharf (Leeds)"}
                                </span>
                            </div>
                            <div
                                style={{
                                    width: 14,
                                    height: 14,
                                    borderRadius: "50%",
                                    backgroundColor: "#18181b",
                                    color: "white",
                                    display: "grid",
                                    placeItems: "center",
                                    fontSize: 6,
                                    fontWeight: 700,
                                }}
                            >
                                TS
                            </div>
                        </div>
                    )}

                    {/* Active Mock Screen Viewport */}
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            minHeight: 0,
                        }}
                    >
                        {/* Sidebar (for Labrador screens) */}
                        {currentScreen !== 1 && (
                            <div
                                style={{
                                    width: 110,
                                    backgroundColor: "#fafafa",
                                    borderRight: "1px solid #f4f4f5",
                                    padding: "6px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    flexShrink: 0,
                                }}
                            >
                                {[
                                    { name: "Live Overview", idx: 0 },
                                    { name: "Facility Agreement", idx: 1 },
                                    { name: "Reporting", idx: 2 },
                                    { name: "Billing", idx: 3 },
                                    { name: "Asset (Day 1)", idx: 0 },
                                    { name: "Data Room", idx: 3 },
                                ].map((item, i) => {
                                    const isActive =
                                        (currentScreen === 0 && i === 4) ||
                                        (currentScreen === 2 && i === 2) ||
                                        (currentScreen === 3 && i === 5)
                                    return (
                                        <div
                                            key={`${item.name}-${i}`}
                                            style={{
                                                fontSize: 7,
                                                padding: "4px 6px",
                                                borderRadius: 4,
                                                fontWeight: isActive
                                                    ? 600
                                                    : 400,
                                                color: isActive
                                                    ? "#18181b"
                                                    : "#71717a",
                                                backgroundColor: isActive
                                                    ? "#e4e4e7"
                                                    : "transparent",
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {/* Active Render */}
                        {currentScreen === 0 && <AssetScreen />}
                        {currentScreen === 1 && <OutlookScreen />}
                        {currentScreen === 2 && <ReportingScreen />}
                        {currentScreen === 3 && <DocChatScreen />}
                    </div>
                </div>
            </div>

            {/* Laptop Base Stand */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 780,
                    height: 10,
                    borderRadius: "0 0 10px 10px",
                    background:
                        "linear-gradient(to bottom, #eceded, #d4d5d7, #9fa1a4)",
                    boxShadow: "0 15px 25px -10px rgba(0, 0, 0, 0.4)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: 0,
                        height: "45%",
                        width: "12%",
                        transform: "translateX(-50%)",
                        borderRadius: "0 0 8px 8px",
                        background:
                            "linear-gradient(to bottom, #aeb0b3, #d8d9db)",
                    }}
                />
            </div>
        </div>
    )
}

addPropertyControls(EfficuraMasterShowcase, {
    screenMode: {
        title: "Screen Mode",
        type: ControlType.Enum,
        options: [
            "Auto Cycle",
            "1. System of Record",
            "2. Outlook Deal Origination",
            "3. Servicing & Reporting",
            "4. Document Chat",
        ],
        defaultValue: "Auto Cycle",
    },
    cycleDuration: {
        title: "Cycle (sec)",
        type: ControlType.Number,
        defaultValue: 6.5,
        min: 2,
        max: 20,
        step: 0.5,
        unit: "s",
        hidden(props) {
            return props.screenMode !== "Auto Cycle"
        },
    },
})
