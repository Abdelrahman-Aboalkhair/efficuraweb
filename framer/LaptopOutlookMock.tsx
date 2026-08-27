import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * ============================================================================
 * Efficura - Outlook Deal Origination Showcase for Framer
 * ============================================================================
 *
 * Standalone Framer Component:
 * - Outlook Web Client layout (ribbon, message list, reading pane, apps panel)
 * - Animated cursor moving across panes, clicking "Create new deal"
 * - Button state transition to "Sent!" and deal creation confirmation
 * - Direct style forwarding and zero external dependencies
 *
 * @framerIntrinsicWidth 800
 * @framerIntrinsicHeight 520
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */

interface EfficuraOutlookShowcaseProps {
    style?: React.CSSProperties
    senderName?: string
    dealName?: string
    facilityAmount?: string
    gdvAmount?: string
    ltv?: string
    loop?: boolean
}

const BRAND_GREEN = "#3a5a40"
const OUTLOOK_BLUE = "#0f6cbd"

export default function EfficuraOutlookShowcase(
    props: EfficuraOutlookShowcaseProps
) {
    const {
        style,
        senderName = "Ed Lawson",
        dealName = "Harbour Yard",
        facilityAmount = "£48.5m",
        gdvAmount = "£83.0m",
        ltv = "58.4%",
        loop = true,
    } = props

    // Animation timeline: 0 = start/click email, 1 = moving cursor, 2 = button click, 3 = sent & deal toast
    const [phase, setPhase] = React.useState(0)

    React.useEffect(() => {
        let t1: NodeJS.Timeout,
            t2: NodeJS.Timeout,
            t3: NodeJS.Timeout,
            tLoop: NodeJS.Timeout

        const runSequence = () => {
            setPhase(0)
            // Cursor starts swooping at 1.4s
            t1 = setTimeout(() => setPhase(1), 1400)
            // Cursor reaches button and clicks at 2.8s
            t2 = setTimeout(() => setPhase(2), 2800)
            // Deal created toast appears at 3.3s
            t3 = setTimeout(() => setPhase(3), 3300)

            if (loop) {
                tLoop = setTimeout(runSequence, 7000)
            }
        }

        runSequence()

        return () => {
            clearTimeout(t1)
            clearTimeout(t2)
            clearTimeout(t3)
            clearTimeout(tLoop)
        }
    }, [loop])

    const isCursorMoved = phase >= 1
    const isClicked = phase >= 2
    const isSent = phase >= 3

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
            {/* Laptop Outer Bezel */}
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
                    {/* Window Title Bar */}
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
                            outlook.office.com/mail
                        </div>
                    </div>

                    {/* Main Body */}
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            minHeight: 0,
                            position: "relative",
                        }}
                    >
                        {/* Outlook Module Rail */}
                        <div
                            style={{
                                width: 30,
                                backgroundColor: "#ffffff",
                                borderRight: "1px solid #f4f4f5",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 10,
                                paddingTop: 8,
                                flexShrink: 0,
                            }}
                        >
                            <svg
                                viewBox="0 0 16 16"
                                style={{
                                    width: 13,
                                    height: 13,
                                    fill: "none",
                                    stroke: OUTLOOK_BLUE,
                                    strokeWidth: 1.2,
                                }}
                            >
                                <rect
                                    x="1.8"
                                    y="3.6"
                                    width="12.4"
                                    height="9"
                                    rx="1.3"
                                />
                                <path d="m2.4 4.8 5.6 4 5.6-4" />
                            </svg>
                            <svg
                                viewBox="0 0 16 16"
                                style={{
                                    width: 13,
                                    height: 13,
                                    fill: "none",
                                    stroke: "#a1a1aa",
                                    strokeWidth: 1.2,
                                }}
                            >
                                <rect
                                    x="2.4"
                                    y="3"
                                    width="11.2"
                                    height="10.4"
                                    rx="1.3"
                                />
                                <path d="M2.4 6.4h11.2M5.4 1.7v2.5M10.6 1.7v2.5" />
                            </svg>
                            <svg
                                viewBox="0 0 16 16"
                                style={{
                                    width: 13,
                                    height: 13,
                                    fill: "none",
                                    stroke: "#a1a1aa",
                                    strokeWidth: 1.2,
                                }}
                            >
                                <circle cx="5.6" cy="5.6" r="2.2" />
                                <path d="M1.9 13a3.8 3.8 0 0 1 7.4 0M10.4 8a2 2 0 1 0-.5-3.9M11 9.7a3.4 3.4 0 0 1 3 3.3" />
                            </svg>
                        </div>

                        {/* Folder Pane */}
                        <div
                            style={{
                                width: 85,
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
                                    padding: "3px 5px",
                                    borderRadius: 3,
                                    backgroundColor: "#d5e4f2",
                                    fontWeight: 600,
                                    color: "#18181b",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>Inbox</span>
                                <span style={{ color: OUTLOOK_BLUE }}>22</span>
                            </div>
                            <div
                                style={{
                                    padding: "3px 5px",
                                    color: "#71717a",
                                }}
                            >
                                Sent Items
                            </div>
                            <div
                                style={{
                                    padding: "3px 5px",
                                    color: "#71717a",
                                }}
                            >
                                Drafts [5]
                            </div>
                        </div>

                        {/* Message List */}
                        <div
                            style={{
                                width: 140,
                                borderRight: "1px solid #e4e4e7",
                                display: "flex",
                                flexDirection: "column",
                                flexShrink: 0,
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <div
                                style={{
                                    height: 22,
                                    borderBottom: "1px solid #f4f4f5",
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "0 8px",
                                    fontSize: 7,
                                    fontWeight: 600,
                                    color: "#18181b",
                                }}
                            >
                                Focused
                            </div>

                            {/* Email Row: James */}
                            <div
                                style={{
                                    padding: "5px 8px",
                                    borderBottom: "1px solid #f4f4f5",
                                    fontSize: 7,
                                    display: "flex",
                                    gap: 6,
                                }}
                            >
                                <div
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: "50%",
                                        backgroundColor: "#7719aa",
                                        color: "white",
                                        display: "grid",
                                        placeItems: "center",
                                        fontSize: 6,
                                        fontWeight: 700,
                                        flexShrink: 0,
                                    }}
                                >
                                    JW
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            color: "#18181b",
                                        }}
                                    >
                                        James Whitfield
                                    </div>
                                    <div
                                        style={{
                                            color: OUTLOOK_BLUE,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        Priverd Lane
                                    </div>
                                </div>
                            </div>

                            {/* Email Row: Ed Lawson (Selected) */}
                            <div
                                style={{
                                    padding: "5px 8px",
                                    backgroundColor: "#f4f4f5",
                                    borderLeft: `2px solid ${OUTLOOK_BLUE}`,
                                    fontSize: 7,
                                    display: "flex",
                                    gap: 6,
                                }}
                            >
                                <div
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: "50%",
                                        backgroundColor: OUTLOOK_BLUE,
                                        color: "white",
                                        display: "grid",
                                        placeItems: "center",
                                        fontSize: 6,
                                        fontWeight: 700,
                                        flexShrink: 0,
                                    }}
                                >
                                    EL
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            color: "#18181b",
                                        }}
                                    >
                                        {senderName}
                                    </div>
                                    <div
                                        style={{
                                            color: "#27272a",
                                            fontWeight: 600,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {dealName} - facility pack
                                    </div>
                                </div>
                            </div>

                            {/* Email Row: Marcus */}
                            <div
                                style={{
                                    padding: "5px 8px",
                                    fontSize: 7,
                                    display: "flex",
                                    gap: 6,
                                }}
                            >
                                <div
                                    style={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: "50%",
                                        backgroundColor: "#0b6a0b",
                                        color: "white",
                                        display: "grid",
                                        placeItems: "center",
                                        fontSize: 6,
                                        fontWeight: 700,
                                        flexShrink: 0,
                                    }}
                                >
                                    MW
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            color: "#18181b",
                                        }}
                                    >
                                        Marcus Webb
                                    </div>
                                    <div
                                        style={{
                                            color: "#71717a",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        Granary Wharf | term sheet
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reading Pane */}
                        <div
                            style={{
                                flex: 1,
                                padding: "10px 14px",
                                display: "flex",
                                flexDirection: "column",
                                gap: 6,
                                backgroundColor: "#ffffff",
                                minWidth: 0,
                            }}
                        >
                            <h4
                                style={{
                                    margin: 0,
                                    fontSize: 10,
                                    fontWeight: 600,
                                    color: "#18181b",
                                }}
                            >
                                {dealName} - facility pack
                            </h4>
                            <div style={{ fontSize: 7, color: "#a1a1aa" }}>
                                From: {senderName} &lt;
                                <span style={{ color: OUTLOOK_BLUE }}>
                                    ed.lawson@excap.example
                                </span>
                                &gt;
                            </div>
                            <div
                                style={{
                                    fontSize: 8,
                                    lineHeight: 1.5,
                                    color: "#52525b",
                                    marginTop: 4,
                                }}
                            >
                                <p style={{ margin: "0 0 4px" }}>Hi team,</p>
                                <p style={{ margin: "0 0 4px" }}>
                                    Please see the attached pack for{" "}
                                    {dealName}:
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                        paddingLeft: 4,
                                    }}
                                >
                                    <div>• 120 Key Hotel</div>
                                    <div>
                                        • <strong>{facilityAmount}</strong>{" "}
                                        senior facility
                                    </div>
                                    <div>
                                        • <strong>{gdvAmount}</strong> GDV
                                    </div>
                                    <div>• {ltv} LTV</div>
                                </div>
                            </div>
                        </div>

                        {/* Labrador Apps Panel (Right) */}
                        <div
                            style={{
                                width: 130,
                                borderLeft: "1px solid #e4e4e7",
                                backgroundColor: "#ffffff",
                                padding: "10px 8px",
                                display: "flex",
                                flexDirection: "column",
                                flexShrink: 0,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    fontSize: 8,
                                    fontWeight: 600,
                                    color: "#18181b",
                                    marginBottom: 10,
                                }}
                            >
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: 2,
                                        backgroundColor: BRAND_GREEN,
                                        color: "white",
                                        display: "grid",
                                        placeItems: "center",
                                        fontSize: 7,
                                        fontWeight: 700,
                                    }}
                                >
                                    E
                                </div>
                                Send to labrador
                            </div>

                            {/* Create new deal button */}
                            <div
                                style={{
                                    padding: "6px 8px",
                                    borderRadius: 4,
                                    backgroundColor: isClicked
                                        ? BRAND_GREEN
                                        : "#18181b",
                                    color: "#ffffff",
                                    fontSize: 8,
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 4,
                                    transform:
                                        phase === 2
                                            ? "scale(0.95)"
                                            : "scale(1)",
                                    transition:
                                        "transform 0.15s ease, background-color 0.2s ease",
                                }}
                            >
                                {isSent ? "✓ Sent!" : "+ Create new deal"}
                            </div>

                            <div
                                style={{
                                    marginTop: 4,
                                    padding: "6px 8px",
                                    borderRadius: 4,
                                    border: "1px solid #e4e4e7",
                                    color: "#71717a",
                                    fontSize: 7,
                                    textAlign: "center",
                                }}
                            >
                                File to existing deal
                            </div>

                            {/* Deal Created Confirmation Toast */}
                            <div
                                style={{
                                    marginTop: 10,
                                    padding: "4px 6px",
                                    borderRadius: 4,
                                    backgroundColor: "rgba(58, 90, 64, 0.12)",
                                    border: `1px solid rgba(58, 90, 64, 0.3)`,
                                    color: BRAND_GREEN,
                                    fontSize: 7,
                                    fontWeight: 600,
                                    opacity: isSent ? 1 : 0,
                                    transform: isSent
                                        ? "translateY(0)"
                                        : "translateY(4px)",
                                    transition:
                                        "opacity 0.3s ease, transform 0.3s ease",
                                }}
                            >
                                ✓ Deal created: {dealName}
                            </div>
                        </div>

                        {/* Animated Cursor */}
                        <div
                            style={{
                                position: "absolute",
                                zIndex: 20,
                                pointerEvents: "none",
                                left: isCursorMoved ? "88%" : "24%",
                                top: isCursorMoved ? "16%" : "44%",
                                transform:
                                    phase === 2
                                        ? "scale(0.85)"
                                        : "scale(1)",
                                transition:
                                    "left 1.2s cubic-bezier(0.22, 1, 0.36, 1), top 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 0.15s ease",
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                style={{
                                    width: 15,
                                    height: 15,
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

addPropertyControls(EfficuraOutlookShowcase, {
    senderName: {
        title: "Sender",
        type: ControlType.String,
        defaultValue: "Ed Lawson",
    },
    dealName: {
        title: "Deal Name",
        type: ControlType.String,
        defaultValue: "Harbour Yard",
    },
    facilityAmount: {
        title: "Facility",
        type: ControlType.String,
        defaultValue: "£48.5m",
    },
    gdvAmount: {
        title: "GDV",
        type: ControlType.String,
        defaultValue: "£83.0m",
    },
    ltv: {
        title: "LTV",
        type: ControlType.String,
        defaultValue: "58.4%",
    },
    loop: {
        title: "Loop Animation",
        type: ControlType.Boolean,
        defaultValue: true,
    },
})
