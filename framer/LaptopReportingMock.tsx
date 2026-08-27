import React, {
    startTransition,
    useCallback,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { motion, useInView, animate } from "framer-motion"

/**
 * ============================================================================
 * Efficura - Servicing & Reporting Showcase
 * ============================================================================
 * 
 * Standalone Framer Code Component showing the Labrador Reporting & Servicing screen:
 * - Approved report badge & snapshot actions
 * - 30 Changes SVG Donut Chart with animated count-up
 * - Headline KPI cards (Valuation £106.8m, Senior LTV 35.58%, NRI £1.385m +4.2%, Loan £65m)
 * - Animated self-drawing SVG spline trendline path
 * - High-DPI MacBook frame with responsive 1280x800 scaling engine & floating physics
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */

interface EfficuraReportingShowcaseProps {
    maxWidth?: number
    animated?: boolean
    floatDistance?: number
    floatDuration?: number
    showShadow?: boolean
}

function CountUp({
    to,
    delay = 0,
    format = (v: number) => Math.round(v).toLocaleString("en-GB"),
}: {
    to: number
    delay?: number
    format?: (v: number) => string
}) {
    const [value, setValue] = useState(0)
    useEffect(() => {
        const controls = animate(0, to, {
            delay,
            duration: 1.3,
            ease: "easeOut",
            onUpdate: (val) => setValue(val),
        })
        return () => controls.stop()
    }, [to, delay])
    return <>{format(value)}</>
}

const GLYPHS: Record<string, ReactNode> = {
    back: <path d="M13 8H3.4M7.2 4.2 3.4 8l3.8 3.8" />,
    panel: (
        <>
            <rect x="2" y="3" width="12" height="10" rx="1.5" />
            <path d="M6.2 3v10" />
        </>
    ),
    chevronDown: <path d="m4 6.2 4 4 4-4" />,
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
    check: (
        <>
            <circle cx="8" cy="8" r="5.6" />
            <path d="m5.5 8.2 1.8 1.8 3.2-3.8" />
        </>
    ),
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

const reportChanges = [
    { label: "Decreased", count: 1, color: "#344e41" },
    { label: "Increased", count: 14, color: "#588157" },
    { label: "Info", count: 15, color: "#5b84ae" },
]
const REPORT_CHANGE_TOTAL = 30

function ChangesDonut() {
    const segments = reportChanges.map((seg, i) => ({
        ...seg,
        frac: seg.count / REPORT_CHANGE_TOTAL,
        offset: reportChanges
            .slice(0, i)
            .reduce((sum, s) => sum + s.count / REPORT_CHANGE_TOTAL, 0),
    }))
    return (
        <div
            style={{
                position: "relative",
                width: 90,
                height: 90,
                flexShrink: 0,
            }}
        >
            <svg
                viewBox="0 0 64 64"
                style={{
                    width: "100%",
                    height: "100%",
                    transform: "rotate(-90deg)",
                }}
            >
                {segments.map((seg) => (
                    <circle
                        key={seg.label}
                        cx="32"
                        cy="32"
                        r="25"
                        pathLength={1}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="13"
                        strokeDasharray={`${seg.frac} ${1 - seg.frac}`}
                        strokeDashoffset={-seg.offset}
                    />
                ))}
            </svg>
            <span
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    color: "#27272a",
                }}
            >
                <CountUp to={REPORT_CHANGE_TOTAL} delay={0.45} />
            </span>
        </div>
    )
}

function TrendChart() {
    return (
        <div style={{ marginTop: 12 }}>
            <div style={{ position: "relative", height: 110 }}>
                {["£1.5m", "£1.4m", "£1.3m", "£1.3m"].map((label, i) => (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            borderTop: "1px solid #f4f4f5",
                            top: `${(i / 3) * 100}%`,
                        }}
                    >
                        <span
                            style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                transform: "translateY(-100%)",
                                fontSize: 7,
                                color: "#a1a1aa",
                            }}
                        >
                            {label}
                        </span>
                    </div>
                ))}
                <svg
                    viewBox="0 0 1000 100"
                    preserveAspectRatio="none"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        overflow: "visible",
                    }}
                >
                    <motion.path
                        d="M 0 100 C 300 100, 420 7, 540 6 C 630 5, 720 57, 800 57 C 870 57, 940 52, 1000 50"
                        fill="none"
                        stroke="#18181b"
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            delay: 0.7,
                            duration: 1.4,
                            ease: "easeInOut",
                        }}
                    />
                </svg>
            </div>
            <div
                style={{
                    marginTop: 6,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 7,
                    letterSpacing: 0.5,
                    color: "#a1a1aa",
                }}
            >
                {[
                    "APR 2025",
                    "JUL 2025",
                    "OCT 2025",
                    "JAN 2026",
                    "APR 2026",
                ].map((t) => (
                    <span key={t}>{t}</span>
                ))}
            </div>
        </div>
    )
}

export default function EfficuraReportingShowcase(
    props: EfficuraReportingShowcaseProps
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
                                labrador - Granary Wharf (Leeds) - Reporting
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
                                            fontWeight: i === 2 ? 600 : 400,
                                            color:
                                                i === 2
                                                    ? "#18181b"
                                                    : "#71717a",
                                            backgroundColor:
                                                i === 2
                                                    ? "#f4f4f5"
                                                    : "transparent",
                                        }}
                                    >
                                        {i === 2 && (
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
                                                    i === 2
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

                            {/* Content */}
                            <div
                                style={{
                                    display: "flex",
                                    minHeight: 0,
                                    minWidth: 0,
                                    flex: 1,
                                    flexDirection: "column",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Header */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexShrink: 0,
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        borderBottom: "1px solid #f4f4f5",
                                        padding: "8px 24px",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 700,
                                                color: "#18181b",
                                            }}
                                        >
                                            Reporting
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 11,
                                                color: "#a1a1aa",
                                            }}
                                        >
                                            APR 2026
                                        </span>
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                borderRadius: 9999,
                                                border: "1px solid #a7f3d0",
                                                backgroundColor: "#ecfdf5",
                                                padding: "2px 8px",
                                                fontSize: 8,
                                                fontWeight: 600,
                                                color: "#059669",
                                            }}
                                        >
                                            <Glyph name="check" size={8} />
                                            Approved · 29 Jun 2026
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            fontSize: 9,
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                                borderRadius: 6,
                                                backgroundColor: "#f4f4f5",
                                                padding: "4px 8px",
                                                color: "#3f3f46",
                                            }}
                                        >
                                            <Glyph
                                                name="calendar"
                                                size={10}
                                                style={{ color: "#71717a" }}
                                            />
                                            APR 2026
                                            <Glyph
                                                name="chevronDown"
                                                size={8}
                                                style={{ color: "#a1a1aa" }}
                                            />
                                        </span>
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                                borderRadius: 6,
                                                backgroundColor: "#18181b",
                                                padding: "4px 8px",
                                                fontWeight: 600,
                                                color: "#ffffff",
                                            }}
                                        >
                                            <Glyph name="export" size={10} />
                                            Add snapshot
                                        </span>
                                    </div>
                                </div>

                                {/* Body Panel */}
                                <div
                                    style={{
                                        minHeight: 0,
                                        flex: 1,
                                        overflow: "hidden",
                                        padding: "16px 24px",
                                    }}
                                >
                                    {/* Changes section */}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexShrink: 0,
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 16,
                                        }}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.1,
                                                duration: 0.35,
                                            }}
                                            style={{
                                                borderLeft: "4px solid #18181b",
                                                paddingLeft: 12,
                                            }}
                                        >
                                            <p
                                                style={{
                                                    margin: 0,
                                                    fontSize: 28,
                                                    fontWeight: 700,
                                                    fontVariantNumeric:
                                                        "tabular-nums",
                                                    color: "#18181b",
                                                }}
                                            >
                                                <CountUp
                                                    to={REPORT_CHANGE_TOTAL}
                                                    delay={0.3}
                                                />
                                            </p>
                                            <p
                                                style={{
                                                    margin: "2px 0 0",
                                                    fontSize: 10,
                                                    fontWeight: 600,
                                                    color: "#27272a",
                                                }}
                                            >
                                                Changes since last report
                                            </p>
                                            <p
                                                style={{
                                                    margin: "4px 0 0",
                                                    fontSize: 8,
                                                    color: "#a1a1aa",
                                                }}
                                            >
                                                15 info
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.2,
                                                duration: 0.35,
                                            }}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 16,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: 110,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: 4,
                                                }}
                                            >
                                                {reportChanges.map((seg) => (
                                                    <div
                                                        key={seg.label}
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 6,
                                                            fontSize: 8,
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                height: 6,
                                                                width: 6,
                                                                borderRadius:
                                                                    "50%",
                                                                backgroundColor:
                                                                    seg.color,
                                                            }}
                                                        />
                                                        <span
                                                            style={{
                                                                color: "#71717a",
                                                            }}
                                                        >
                                                            {seg.label}
                                                        </span>
                                                        <span
                                                            style={{
                                                                marginLeft:
                                                                    "auto",
                                                                fontVariantNumeric:
                                                                    "tabular-nums",
                                                                color: "#3f3f46",
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {seg.count}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <ChangesDonut />
                                        </motion.div>
                                    </div>

                                    {/* Headline Metrics */}
                                    <div
                                        style={{
                                            marginTop: 16,
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(4, 1fr)",
                                            gap: 24,
                                        }}
                                    >
                                        {[
                                            {
                                                label: "Valuation",
                                                val: (
                                                    <>
                                                        £
                                                        <CountUp
                                                            to={106800000}
                                                            delay={0.45}
                                                        />
                                                    </>
                                                ),
                                            },
                                            {
                                                label: "Senior LTV",
                                                val: (
                                                    <CountUp
                                                        to={35.58}
                                                        delay={0.53}
                                                        format={(v) =>
                                                            `${v.toFixed(2)}%`
                                                        }
                                                    />
                                                ),
                                            },
                                            {
                                                label:
                                                    "Net Rental Income (3M LB)",
                                                val: (
                                                    <>
                                                        £
                                                        <CountUp
                                                            to={1385527}
                                                            delay={0.61}
                                                        />
                                                    </>
                                                ),
                                                sub: "+4.2%",
                                            },
                                            {
                                                label: "Loan outstanding",
                                                val: (
                                                    <>
                                                        £
                                                        <CountUp
                                                            to={65000000}
                                                            delay={0.69}
                                                        />
                                                    </>
                                                ),
                                            },
                                        ].map((m, i) => (
                                            <motion.div
                                                key={m.label}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: 0.25 + i * 0.08,
                                                    duration: 0.35,
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        margin: 0,
                                                        fontSize: 9,
                                                        color: "#a1a1aa",
                                                    }}
                                                >
                                                    {m.label}
                                                </p>
                                                <p
                                                    style={{
                                                        margin: "2px 0 0",
                                                        fontSize: 16,
                                                        fontWeight: 700,
                                                        fontVariantNumeric:
                                                            "tabular-nums",
                                                        color: "#18181b",
                                                    }}
                                                >
                                                    {m.val}
                                                </p>
                                                {m.sub && (
                                                    <p
                                                        style={{
                                                            margin: "4px 0 0",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 2,
                                                            fontSize: 8,
                                                            color: "#71717a",
                                                        }}
                                                    >
                                                        <Glyph
                                                            name="trend"
                                                            size={8}
                                                        />
                                                        {m.sub}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Trend Overview */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.45,
                                            duration: 0.35,
                                        }}
                                        style={{ marginTop: 16 }}
                                    >
                                        <p
                                            style={{
                                                margin: 0,
                                                fontSize: 11,
                                                fontWeight: 700,
                                                color: "#18181b",
                                            }}
                                        >
                                            Trend overview{" "}
                                            <span
                                                style={{
                                                    fontWeight: 400,
                                                    color: "#a1a1aa",
                                                }}
                                            >
                                                · key metrics
                                            </span>
                                        </p>
                                        <TrendChart />
                                    </motion.div>
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

addPropertyControls(EfficuraReportingShowcase, {
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
