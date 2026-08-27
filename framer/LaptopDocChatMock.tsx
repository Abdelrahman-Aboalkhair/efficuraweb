import React, {
    startTransition,
    useCallback,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { motion, useInView, AnimatePresence } from "framer-motion"

/**
 * ============================================================================
 * Efficura - Data Room Document Chat Showcase
 * ============================================================================
 * 
 * Standalone Framer Code Component showing the Labrador Data Room Document Chat:
 * - Granary Wharf Credit Memo PDF viewer
 * - Character-by-character live prompt typing animation
 * - Animated cursor swooping & clicking "Ask" button
 * - Thinking dots pulse & Effi response with citations
 * - Synchronized document text highlight when answer is generated
 * - High-DPI MacBook frame with responsive 1280x800 scaling engine & floating physics
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */

interface EfficuraDocChatShowcaseProps {
    maxWidth?: number
    animated?: boolean
    floatDistance?: number
    floatDuration?: number
    showShadow?: boolean
}

const BRAND_GREEN = "#3a5a40"
const DOC_NAME = "Aldercott Capital – Granary Wharf Credit Memo (Apr 2026).pdf"
const DOC_QUESTION = "What's the market value and current senior LTV?"
const DOC_ANSWER =
    "Granary Wharf Estate is valued at £106.8m as at April 2026. With £38m of senior debt drawn, the senior LTV is 35.58%."

const GLYPHS: Record<string, ReactNode> = {
    back: <path d="M13 8H3.4M7.2 4.2 3.4 8l3.8 3.8" />,
    panel: (
        <>
            <rect x="2" y="3" width="12" height="10" rx="1.5" />
            <path d="M6.2 3v10" />
        </>
    ),
    chevronDown: <path d="m4 6.2 4 4 4-4" />,
    chevronLeft: <path d="m9.8 4.2-3.8 3.8 3.8 3.8" />,
    chevronRight: <path d="m6.2 4.2 3.8 3.8-3.8 3.8" />,
    sparkle: (
        <path
            fill="currentColor"
            stroke="none"
            d="M8 1.6 9.3 6l4.4 1.3-4.4 1.3L8 13l-1.3-4.4L2.3 7.3 6.7 6 8 1.6z"
        />
    ),
    grid: (
        <>
            <rect x="2.6" y="2.6" width="4.7" height="4.7" rx="1" />
            <rect x="8.7" y="2.6" width="4.7" height="4.7" rx="1" />
            <rect x="2.6" y="8.7" width="4.7" height="4.7" rx="1" />
            <rect x="8.7" y="8.7" width="4.7" height="4.7" rx="1" />
        </>
    ),
    draft: (
        <path d="m3 13 .7-2.9 7.2-7.2a1.1 1.1 0 0 1 1.6 0l.6.6a1.1 1.1 0 0 1 0 1.6L5.9 12.3 3 13z" />
    ),
    barChart: <path d="M3.6 13.2V8.8M8 13.2V4.4M12.4 13.2V10" />,
    calendar: (
        <>
            <rect x="2.4" y="3" width="11.2" height="10.4" rx="1.3" />
            <path d="M2.4 6.4h11.2M5.4 1.7v2.5M10.6 1.7v2.5" />
        </>
    ),
    card: (
        <>
            <rect x="1.8" y="3.6" width="12.4" height="9" rx="1.4" />
            <path d="M1.8 6.6h12.4M4.2 10.4h3.2" />
        </>
    ),
    trend: <path d="m2.4 11.6 4-4.4 2.6 2.4 4.6-5.2M10.4 4.4h3.2v3.2" />,
    building: (
        <>
            <path d="M4.2 13.4V2.8h7.6v10.6M2.6 13.4h10.8" />
            <path d="M6.5 5.3h1M8.9 5.3h1M6.5 7.7h1M8.9 7.7h1M7.3 13.4v-2.7h1.7v2.7" />
        </>
    ),
    folder: (
        <path d="M1.8 4h4.1l1.4 1.6h6.9v6.9a.9.9 0 0 1-.9.9H2.7a.9.9 0 0 1-.9-.9V4z" />
    ),
    export: (
        <path d="M13.4 2.6 7.8 8.2M9.6 2.4h4.2v4.2M13.4 9.4v3.2a1.4 1.4 0 0 1-1.4 1.4H3.6a1.4 1.4 0 0 1-1.4-1.4V4.2a1.4 1.4 0 0 1 1.4-1.4h3.2" />
    ),
    arrowUpRight: <path d="M4.8 11.2 11.2 4.8M6.2 4.8h5v5" />,
    hamburger: <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />,
    filter: <path d="M2.5 4.2h11M4.7 8h6.6M6.9 11.8h2.2" />,
    search: (
        <>
            <circle cx="7" cy="7" r="4" />
            <path d="m10.2 10.2 3.6 3.6" />
        </>
    ),
    note: <path d="M3 2.6h10V10l-3.4 3.4H3V2.6zM9.6 13.4V10H13" />,
}

function Glyph({
    name,
    size = 14,
    style,
}: {
    name: string
    size?: number
    style?: React.CSSProperties
}) {
    return (
        <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
                width: size,
                height: size,
                display: "inline-block",
                verticalAlign: "middle",
                ...style,
            }}
        >
            {GLYPHS[name]}
        </svg>
    )
}

function Pointer({ size = 16 }: { size?: number }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{
                width: size,
                height: size,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                display: "block",
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
    )
}

const recordNav = [
    { icon: "grid", label: "Live Overview" },
    { icon: "draft", label: "Facility Agreement" },
    { icon: "barChart", label: "Reporting" },
    { icon: "calendar", label: "Calendar" },
    { icon: "card", label: "Billing & Redemption" },
    { icon: "trend", label: "Transaction (Day 1)" },
    { icon: "building", label: "Asset (Day 1)" },
    { icon: "folder", label: "Data Room" },
    { icon: "export", label: "Exports" },
]

function DocChatSequence() {
    const [stage, setStage] = useState(0)
    const [typed, setTyped] = useState("")

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 500),
            setTimeout(() => setStage(2), 1800),
            setTimeout(() => setStage(3), 2200),
            setTimeout(() => setStage(4), 3200),
        ]
        return () => timers.forEach(clearTimeout)
    }, [])

    useEffect(() => {
        if (stage !== 1) return
        let i = 0
        const id = setInterval(() => {
            i += 2
            setTyped(DOC_QUESTION.slice(0, i))
            if (i >= DOC_QUESTION.length) clearInterval(id)
        }, 28)
        return () => clearInterval(id)
    }, [stage])

    const showTyped = stage === 1 && typed.length > 0
    const active = stage >= 1

    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                minHeight: 0,
                width: 440,
                flexShrink: 0,
                flexDirection: "column",
                backgroundColor: "#ffffff",
                borderRight: "1px solid #e4e4e7",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    height: 32,
                    flexShrink: 0,
                    alignItems: "center",
                    gap: 6,
                    borderBottom: "1px solid #f4f4f5",
                    paddingLeft: 12,
                    paddingRight: 12,
                    fontSize: 10,
                    color: "#71717a",
                }}
            >
                <Glyph name="back" size={12} style={{ color: "#a1a1aa" }} />
                <span>Data Room</span>
                <span style={{ color: "#d4d4d8" }}>/</span>
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontWeight: 600,
                        color: "#3f3f46",
                        overflow: "hidden",
                    }}
                >
                    <span
                        style={{
                            height: 12,
                            width: 10,
                            borderRadius: 1,
                            backgroundColor: "#ef4444",
                            flexShrink: 0,
                        }}
                    />
                    <span
                        style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {DOC_NAME}
                    </span>
                </span>
            </div>

            {/* Chat Body */}
            <div
                style={{
                    position: "relative",
                    minHeight: 0,
                    flex: 1,
                    overflow: "hidden",
                }}
            >
                <AnimatePresence mode="wait">
                    {stage < 2 ? (
                        <motion.div
                            key="empty"
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                display: "flex",
                                height: "100%",
                                flexDirection: "column",
                                padding: 16,
                            }}
                        >
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: "#27272a",
                                }}
                            >
                                Ask a question about{" "}
                                <span style={{ color: "#a1a1aa" }}>
                                    {DOC_NAME}
                                </span>
                            </p>
                            <div
                                style={{
                                    marginTop: 16,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8,
                                }}
                            >
                                {[
                                    "What market value does the valuation report?",
                                    "What is the senior LTV on the facility?",
                                    "What is the estate's current occupancy?",
                                ].map((q) => (
                                    <div
                                        key={q}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 8,
                                            borderRadius: 8,
                                            border: "1px solid #e4e4e7",
                                            padding: "8px 12px",
                                            fontSize: 10,
                                            color: "#52525b",
                                        }}
                                    >
                                        <span>{q}</span>
                                        <Glyph
                                            name="arrowUpRight"
                                            size={12}
                                            style={{ color: "#d4d4d8" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="convo"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            style={{
                                display: "flex",
                                height: "100%",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                gap: 10,
                                padding: "16px 16px 12px",
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        maxWidth: "85%",
                                        borderRadius: 16,
                                        borderBottomRightRadius: 4,
                                        backgroundColor: "#18181b",
                                        padding: "6px 12px",
                                        fontSize: 10,
                                        lineHeight: 1.4,
                                        color: "#ffffff",
                                    }}
                                >
                                    {DOC_QUESTION}
                                </p>
                            </motion.div>

                            {stage >= 3 && (
                                <div style={{ display: "flex", gap: 8 }}>
                                    <span
                                        style={{
                                            display: "grid",
                                            height: 20,
                                            width: 20,
                                            flexShrink: 0,
                                            placeItems: "center",
                                            borderRadius: "50%",
                                            backgroundColor: `${BRAND_GREEN}1a`,
                                        }}
                                    >
                                        <Glyph
                                            name="sparkle"
                                            size={10}
                                            style={{ color: BRAND_GREEN }}
                                        />
                                    </span>
                                    {stage === 3 ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                borderRadius: 16,
                                                borderTopLeftRadius: 4,
                                                backgroundColor: "#ffffff",
                                                padding: "8px 12px",
                                                border: "1px solid #e4e4e7",
                                            }}
                                        >
                                            {[0, 1, 2].map((i) => (
                                                <motion.span
                                                    key={i}
                                                    style={{
                                                        height: 6,
                                                        width: 6,
                                                        borderRadius: "50%",
                                                        backgroundColor:
                                                            "#d4d4d8",
                                                        display: "inline-block",
                                                    }}
                                                    animate={{
                                                        opacity: [
                                                            0.3, 1, 0.3,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 0.9,
                                                        repeat: Infinity,
                                                        delay: i * 0.15,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            style={{
                                                minWidth: 0,
                                                borderRadius: 16,
                                                borderTopLeftRadius: 4,
                                                backgroundColor: "#ffffff",
                                                padding: "8px 12px",
                                                border: "1px solid #e4e4e7",
                                            }}
                                        >
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: 10,
                                                    lineHeight: 1.5,
                                                    color: "#3f3f46",
                                                }}
                                            >
                                                {DOC_ANSWER}
                                            </p>
                                            <div
                                                style={{
                                                    marginTop: 8,
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 6,
                                                }}
                                            >
                                                {[
                                                    "Valuation summary · p.3",
                                                    "Debt schedule · p.12",
                                                ].map((c) => (
                                                    <span
                                                        key={c}
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 4,
                                                            borderRadius: 6,
                                                            border: "1px solid #e4e4e7",
                                                            backgroundColor:
                                                                "#fafafa",
                                                            padding: "2px 6px",
                                                            fontSize: 8,
                                                            color: "#71717a",
                                                        }}
                                                    >
                                                        <Glyph
                                                            name="note"
                                                            size={8}
                                                            style={{
                                                                color: "#a1a1aa",
                                                            }}
                                                        />
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Composer */}
            <div style={{ flexShrink: 0, padding: "0 16px 12px" }}>
                <div
                    style={{
                        borderRadius: 12,
                        border: "1px solid #e4e4e7",
                        backgroundColor: "#ffffff",
                        padding: "8px 12px",
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                minWidth: 0,
                                flex: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                fontSize: 10,
                            }}
                        >
                            {showTyped ? (
                                <span style={{ color: "#27272a" }}>
                                    {typed}
                                    <motion.span
                                        style={{
                                            marginLeft: 2,
                                            display: "inline-block",
                                            height: 10,
                                            width: 1,
                                            backgroundColor: "#3f3f46",
                                            verticalAlign: "middle",
                                        }}
                                        animate={{ opacity: [1, 0] }}
                                        transition={{
                                            duration: 0.55,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}
                                    />
                                </span>
                            ) : (
                                <span style={{ color: "#a1a1aa" }}>
                                    Ask a question about this document…
                                </span>
                            )}
                        </p>
                        <motion.button
                            tabIndex={-1}
                            animate={{ scale: [1, 0.9, 1] }}
                            transition={{
                                delay: 1.5,
                                duration: 0.3,
                                times: [0, 0.5, 1],
                            }}
                            style={{
                                display: "flex",
                                flexShrink: 0,
                                cursor: "default",
                                alignItems: "center",
                                gap: 4,
                                borderRadius: 8,
                                padding: "6px 10px",
                                fontSize: 9,
                                fontWeight: 600,
                                color: active ? "#ffffff" : "#a1a1aa",
                                backgroundColor: active
                                    ? BRAND_GREEN
                                    : "#f4f4f5",
                                border: "none",
                            }}
                        >
                            <Glyph name="arrowUpRight" size={10} />
                            Ask
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Animated Cursor */}
            <motion.div
                aria-hidden="true"
                initial={{ top: "52%", left: "34%" }}
                animate={{
                    top: ["52%", "52%", "93%", "93%"],
                    left: ["34%", "34%", "90%", "90%"],
                }}
                transition={{
                    delay: 0.9,
                    duration: 0.6,
                    times: [0, 0.1, 0.85, 1],
                    ease: "easeInOut",
                }}
                style={{
                    pointerEvents: "none",
                    position: "absolute",
                    zIndex: 20,
                }}
            >
                <motion.span
                    style={{ display: "block", width: 16, height: 16 }}
                    animate={{ scale: [1, 1, 0.82, 1] }}
                    transition={{
                        delay: 0.9,
                        duration: 0.7,
                        times: [0, 0.8, 0.88, 1],
                    }}
                >
                    <Pointer size={16} />
                </motion.span>
            </motion.div>
        </div>
    )
}

export default function EfficuraDocChatShowcase(
    props: EfficuraDocChatShowcaseProps
) {
    const {
        maxWidth = 1120,
        animated = true,
        floatDistance = 8,
        floatDuration = 4,
        showShadow = true,
    } = props

    const screenContainerRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState<number>(0.4697)

    const staticRenderer = useIsStaticRenderer()
    const isInView = useInView(wrapperRef, { amount: 0.2 })

    const updateScale = useCallback(() => {
        const container = screenContainerRef.current
        if (!container) return
        const currentWidth = container.clientWidth
        const targetScale = currentWidth / 1280
        startTransition(() => setScale(targetScale))
    }, [])

    useEffect(() => {
        if (typeof window === "undefined") return
        const container = screenContainerRef.current
        if (!container) return

        let cleanup: (() => void) | undefined
        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(() => updateScale())
            observer.observe(container)
            cleanup = () => observer.disconnect()
        } else {
            window.addEventListener("resize", updateScale)
            cleanup = () => window.removeEventListener("resize", updateScale)
        }

        updateScale()
        return () => {
            if (cleanup) cleanup()
        }
    }, [updateScale])

    const shouldFloat = animated && !staticRenderer && isInView

    return (
        <motion.div
            ref={wrapperRef}
            style={{
                width: "100%",
                maxWidth,
                margin: "0 auto",
                position: "relative",
                boxSizing: "border-box",
            }}
            animate={shouldFloat ? { y: [0, -floatDistance, 0] } : { y: 0 }}
            transition={
                shouldFloat
                    ? {
                          duration: floatDuration,
                          repeat: Infinity,
                          ease: "easeInOut",
                      }
                    : { duration: 0 }
            }
        >
            {/* Contact Shadow */}
            {showShadow && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: "-2%",
                        right: "-2%",
                        height: 36,
                        transform: "translateY(50%)",
                        borderRadius: "50%",
                        background: "rgba(9, 9, 11, 0.25)",
                        filter: "blur(20px)",
                        pointerEvents: "none",
                    }}
                />
            )}

            {/* Laptop Bezel Display */}
            <div
                style={{
                    position: "relative",
                    margin: "0 auto",
                    width: "84%",
                    padding: "1.1%",
                    backgroundColor: "#0e0e11",
                    borderRadius: "0.9rem 0.9rem 0.35rem 0.35rem",
                    boxShadow: "0 30px 60px -24px rgba(24, 24, 27, 0.45)",
                    boxSizing: "border-box",
                }}
            >
                {/* Camera Lens */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "0.9%",
                        transform: "translateX(-50%)",
                        height: 3,
                        width: 3,
                        borderRadius: "50%",
                        backgroundColor: "#26282c",
                    }}
                />

                {/* Aspect-Ratio Screen Window */}
                <div
                    ref={screenContainerRef}
                    style={{
                        position: "relative",
                        aspectRatio: "16 / 10",
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: "0.45rem",
                        backgroundColor: "#ffffff",
                    }}
                >
                    {/* 1280x800 Scaled Application Frame */}
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: 1280,
                            height: 800,
                            transform: `scale(${scale})`,
                            transformOrigin: "left top",
                            backgroundColor: "#ffffff",
                            userSelect: "none",
                            display: "flex",
                            flexDirection: "column",
                            fontFamily:
                                "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                        }}
                    >
                        {/* Window Header */}
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                height: 36,
                                flexShrink: 0,
                                alignItems: "center",
                                borderBottom: "1px solid #f4f4f5",
                                backgroundColor: "#ffffff",
                                paddingLeft: 12,
                                paddingRight: 12,
                            }}
                        >
                            <div style={{ display: "flex", gap: 6 }}>
                                <span
                                    style={{
                                        height: 10,
                                        width: 10,
                                        borderRadius: "50%",
                                        backgroundColor: "#71717a",
                                    }}
                                />
                                <span
                                    style={{
                                        height: 10,
                                        width: 10,
                                        borderRadius: "50%",
                                        backgroundColor: "#71717a",
                                    }}
                                />
                                <span
                                    style={{
                                        height: 10,
                                        width: 10,
                                        borderRadius: "50%",
                                        backgroundColor: "#71717a",
                                    }}
                                />
                            </div>
                            <span
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    borderRadius: 6,
                                    backgroundColor: "#ffffff",
                                    padding: "2px 12px",
                                    fontSize: 10,
                                    color: "#a1a1aa",
                                    border: "1px solid #e4e4e7",
                                }}
                            >
                                labrador - Granary Wharf (Leeds) - Data Room
                            </span>
                        </div>

                        {/* Top Nav Bar */}
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                height: 32,
                                flexShrink: 0,
                                alignItems: "center",
                                backgroundColor: "#ffffff",
                                paddingLeft: 12,
                                paddingRight: 12,
                                borderBottom: "1px solid #f4f4f5",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    width: 150,
                                    justifyContent: "space-between",
                                }}
                            >
                                <Glyph
                                    name="back"
                                    size={12}
                                    style={{ color: "#71717a" }}
                                />
                                <Glyph
                                    name="panel"
                                    size={12}
                                    style={{ color: "#a1a1aa" }}
                                />
                            </div>
                            <div
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    fontSize: 9,
                                    color: "#a1a1aa",
                                }}
                            >
                                <span>Home</span>
                                <span style={{ color: "#d4d4d8" }}>/</span>
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    labrador
                                    <Glyph name="chevronDown" size={8} />
                                </span>
                                <span style={{ color: "#d4d4d8" }}>/</span>
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                        fontWeight: 600,
                                        color: "#3f3f46",
                                    }}
                                >
                                    <Glyph
                                        name="building"
                                        size={10}
                                        style={{ color: "#71717a" }}
                                    />
                                    Granary Wharf (Leeds)
                                    <Glyph
                                        name="chevronDown"
                                        size={8}
                                        style={{ color: "#a1a1aa" }}
                                    />
                                </span>
                            </div>
                            <div
                                style={{
                                    marginLeft: "auto",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    fontSize: 9,
                                    color: "#71717a",
                                }}
                            >
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                    }}
                                >
                                    <Glyph
                                        name="sparkle"
                                        size={10}
                                        style={{ color: "#a1a1aa" }}
                                    />
                                    Ask Effi
                                </span>
                                <span
                                    style={{
                                        display: "grid",
                                        height: 20,
                                        width: 20,
                                        flexShrink: 0,
                                        placeItems: "center",
                                        borderRadius: "50%",
                                        backgroundColor: "#27272a",
                                        fontSize: 7,
                                        fontWeight: 600,
                                        color: "#ffffff",
                                    }}
                                >
                                    TS
                                </span>
                            </div>
                        </div>

                        {/* Workspace */}
                        <div style={{ display: "flex", minHeight: 0, flex: 1 }}>
                            {/* Sidebar */}
                            <aside
                                style={{
                                    width: 170,
                                    flexShrink: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4,
                                    borderRight: "1px solid #f4f4f5",
                                    backgroundColor: "#ffffff",
                                    padding: 8,
                                }}
                            >
                                {recordNav.map((item, i) => (
                                    <div
                                        key={item.label}
                                        style={{
                                            position: "relative",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                            borderRadius: 6,
                                            padding: "6px 8px",
                                            fontSize: 10,
                                            fontWeight: i === 7 ? 600 : 400,
                                            color:
                                                i === 7
                                                    ? "#18181b"
                                                    : "#71717a",
                                            backgroundColor:
                                                i === 7
                                                    ? "#f4f4f5"
                                                    : "transparent",
                                        }}
                                    >
                                        {i === 7 && (
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    left: -8,
                                                    top: "50%",
                                                    transform:
                                                        "translateY(-50%)",
                                                    height: 14,
                                                    width: 3,
                                                    borderTopRightRadius: 2,
                                                    borderBottomRightRadius: 2,
                                                    backgroundColor: "#18181b",
                                                }}
                                            />
                                        )}
                                        <Glyph
                                            name={item.icon}
                                            size={12}
                                            style={{
                                                color:
                                                    i === 7
                                                        ? "#18181b"
                                                        : "#a1a1aa",
                                            }}
                                        />
                                        <span
                                            style={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </aside>

                            {/* Split Pane: Chat & PDF Viewer */}
                            <div
                                style={{
                                    display: "flex",
                                    minHeight: 0,
                                    minWidth: 0,
                                    flex: 1,
                                }}
                            >
                                <DocChatSequence />

                                {/* PDF Viewer Pane */}
                                <div
                                    style={{
                                        display: "flex",
                                        minWidth: 0,
                                        flex: 1,
                                        flexDirection: "column",
                                        backgroundColor: "#f4f4f5",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            height: 32,
                                            flexShrink: 0,
                                            alignItems: "center",
                                            gap: 10,
                                            borderBottom: "1px solid #e4e4e7",
                                            backgroundColor: "#ffffff",
                                            padding: "0 12px",
                                            color: "#a1a1aa",
                                        }}
                                    >
                                        <Glyph name="hamburger" size={12} />
                                        <Glyph name="draft" size={12} />
                                        <Glyph name="filter" size={12} />
                                        <span
                                            style={{
                                                marginLeft: "auto",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                            }}
                                        >
                                            <Glyph
                                                name="chevronLeft"
                                                size={12}
                                            />
                                            <span
                                                style={{
                                                    borderRadius: 4,
                                                    border: "1px solid #e4e4e7",
                                                    padding: "2px 6px",
                                                    fontSize: 8,
                                                    color: "#52525b",
                                                }}
                                            >
                                                1
                                            </span>
                                            <span style={{ fontSize: 8 }}>
                                                of 21
                                            </span>
                                            <Glyph
                                                name="chevronRight"
                                                size={12}
                                            />
                                        </span>
                                        <span
                                            style={{
                                                marginLeft: "auto",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 10,
                                            }}
                                        >
                                            <Glyph name="search" size={12} />
                                            <Glyph name="export" size={12} />
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            minHeight: 0,
                                            flex: 1,
                                            justifyContent: "center",
                                            overflow: "hidden",
                                            padding: 12,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                height: "100%",
                                                aspectRatio: "1 / 1.414",
                                                flexShrink: 0,
                                                flexDirection: "column",
                                                overflow: "hidden",
                                                borderRadius: 2,
                                                backgroundColor: "#ffffff",
                                                boxShadow:
                                                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                                border: "1px solid #e4e4e7",
                                                padding: 16,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "flex-start",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                        lineHeight: 1.1,
                                                        color: "#18181b",
                                                    }}
                                                >
                                                    Aldercott
                                                    <br />
                                                    Capital
                                                    <br />
                                                    Group
                                                </p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 4,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            display: "grid",
                                                            height: 16,
                                                            width: 16,
                                                            placeItems:
                                                                "center",
                                                            borderRadius: 2,
                                                            fontSize: 8,
                                                            fontWeight: 700,
                                                            color: "#ffffff",
                                                            backgroundColor:
                                                                BRAND_GREEN,
                                                        }}
                                                    >
                                                        A
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontSize: 6,
                                                            fontWeight: 600,
                                                            lineHeight: 1.1,
                                                            color: "#3f3f46",
                                                        }}
                                                    >
                                                        ALDERCOTT
                                                        <br />
                                                        CAPITAL GROUP
                                                    </span>
                                                </div>
                                            </div>
                                            <p
                                                style={{
                                                    margin: "12px 0 0",
                                                    fontSize: 9,
                                                    fontWeight: 700,
                                                    letterSpacing: 0.5,
                                                    color: BRAND_GREEN,
                                                }}
                                            >
                                                FACILITY IV: GRANARY WHARF
                                            </p>
                                            <p
                                                style={{
                                                    margin: "4px 0 0",
                                                    fontSize: 7,
                                                    fontWeight: 600,
                                                    color: "#52525b",
                                                }}
                                            >
                                                April 2026
                                            </p>
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: 7,
                                                    color: "#a1a1aa",
                                                }}
                                            >
                                                Credit Memorandum
                                            </p>
                                            <div
                                                style={{
                                                    marginTop: 8,
                                                    height: 2,
                                                    width: "100%",
                                                    borderRadius: 9999,
                                                    backgroundColor:
                                                        BRAND_GREEN,
                                                }}
                                            />
                                            <div
                                                style={{
                                                    marginTop: 12,
                                                    minHeight: 0,
                                                    flex: 1,
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: 8,
                                                        fontWeight: 700,
                                                        color: "#27272a",
                                                    }}
                                                >
                                                    1. Executive Summary
                                                </p>
                                                <div
                                                    style={{
                                                        marginTop: 6,
                                                        display: "flex",
                                                        flexDirection:
                                                            "column",
                                                        gap: 6,
                                                        fontSize: 6,
                                                        lineHeight: 1.5,
                                                        color: "#71717a",
                                                        textAlign: "justify",
                                                    }}
                                                >
                                                    <p style={{ margin: 0 }}>
                                                        Aldercott Capital Group
                                                        has been mandated to
                                                        arrange a £65.0m senior
                                                        facility secured against
                                                        Granary Wharf Estate, a
                                                        mixed-use waterside
                                                        scheme in Leeds.
                                                    </p>
                                                    <motion.div
                                                        animate={{
                                                            backgroundColor: [
                                                                "transparent",
                                                                "transparent",
                                                                "rgba(58, 90, 64, 0.15)",
                                                                "rgba(58, 90, 64, 0.15)",
                                                            ],
                                                            borderColor: [
                                                                "transparent",
                                                                "transparent",
                                                                BRAND_GREEN,
                                                                BRAND_GREEN,
                                                            ],
                                                        }}
                                                        transition={{
                                                            delay: 3.2,
                                                            duration: 0.5,
                                                        }}
                                                        style={{
                                                            padding: "3px 4px",
                                                            borderRadius: 3,
                                                            border: "1px solid transparent",
                                                        }}
                                                    >
                                                        The estate was
                                                        independently valued at{" "}
                                                        <strong
                                                            style={{
                                                                color: "#18181b",
                                                            }}
                                                        >
                                                            £106.8m
                                                        </strong>{" "}
                                                        as at April 2026 by
                                                        Kestrel Surveyors LLP on
                                                        a market-value basis.
                                                        With £38.0m of senior
                                                        debt drawn, senior LTV
                                                        is{" "}
                                                        <strong
                                                            style={{
                                                                color: "#18181b",
                                                            }}
                                                        >
                                                            35.58%
                                                        </strong>
                                                        .
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Laptop Base Stand */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 0.026",
                    borderRadius: "0 0 0.8rem 0.8rem",
                    background:
                        "linear-gradient(to bottom, #eceded, #d4d5d7, #9fa1a4)",
                    boxShadow: "0 24px 48px -20px rgba(24, 24, 27, 0.5)",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: "7%",
                        right: "7%",
                        top: 0,
                        height: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.25)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: 0,
                        height: "45%",
                        width: "11%",
                        transform: "translateX(-50%)",
                        borderRadius: "0 0 9999px 9999px",
                        background:
                            "linear-gradient(to bottom, #aeb0b3, #d8d9db)",
                    }}
                />
            </div>
        </motion.div>
    )
}

addPropertyControls(EfficuraDocChatShowcase, {
    maxWidth: {
        title: "Max Width",
        type: ControlType.Number,
        defaultValue: 1120,
        min: 320,
        max: 1600,
        step: 10,
        unit: "px",
    },
    animated: {
        title: "Float Anim",
        type: ControlType.Boolean,
        defaultValue: true,
    },
    floatDistance: {
        title: "Float PX",
        type: ControlType.Number,
        defaultValue: 8,
        min: 0,
        max: 40,
        hidden(props) {
            return !props.animated
        },
    },
    floatDuration: {
        title: "Duration",
        type: ControlType.Number,
        defaultValue: 4,
        min: 1,
        max: 12,
        step: 0.1,
        unit: "s",
        hidden(props) {
            return !props.animated
        },
    },
    showShadow: {
        title: "Shadow",
        type: ControlType.Boolean,
        defaultValue: true,
    },
})
