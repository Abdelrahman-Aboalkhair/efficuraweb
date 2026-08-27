import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * ============================================================================
 * Efficura - Minimal Test Animation (Salesforce Tower Asset Showcase)
 * ============================================================================
 *
 * Lightweight, bulletproof Framer component designed to test rendering:
 * - Direct style forwarding (props.style) to prevent 0px canvas collapse
 * - Self-contained CSS & animated counters
 * - Laptop bezel + Salesforce Tower pin & headline metrics
 *
 * @framerIntrinsicWidth 800
 * @framerIntrinsicHeight 520
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */

interface EfficuraMiniShowcaseProps {
    style?: React.CSSProperties
    assetName?: string
    marketValue?: string
    yieldRate?: string
    occupancy?: string
    area?: string
}

export default function EfficuraMiniShowcase(props: EfficuraMiniShowcaseProps) {
    const {
        style,
        assetName = "Salesforce Tower",
        marketValue = "$1,400,000,000",
        yieldRate = "6.50%",
        occupancy = "78%",
        area = "1,420,079 Sq Ft",
    } = props

    // Simple counter animation state
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])

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
                    {/* Top Window Bar */}
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
                            labrador - {assetName}
                        </div>
                    </div>

                    {/* App Sub-header */}
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
                                style={{ fontWeight: 600, color: "#18181b" }}
                            >
                                {assetName}
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

                    {/* Main Workspace (Sidebar + Asset Viewport) */}
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            minHeight: 0,
                        }}
                    >
                        {/* Sidebar */}
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
                                "Live Overview",
                                "Facility Agreement",
                                "Reporting",
                                "Billing",
                                "Asset (Day 1)",
                                "Data Room",
                            ].map((item, i) => (
                                <div
                                    key={item}
                                    style={{
                                        fontSize: 7,
                                        padding: "4px 6px",
                                        borderRadius: 4,
                                        fontWeight: i === 4 ? 600 : 400,
                                        color:
                                            i === 4 ? "#18181b" : "#71717a",
                                        backgroundColor:
                                            i === 4
                                                ? "#e4e4e7"
                                                : "transparent",
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* Visual Asset Canvas */}
                        <div
                            style={{
                                flex: 1,
                                position: "relative",
                                background:
                                    "linear-gradient(135deg, #1e293b 0%, #090d16 100%)",
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
                                    opacity: mounted ? 1 : 0,
                                    transition:
                                        "opacity 0.6s ease, transform 0.6s ease",
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
                                    {assetName}
                                </div>
                                <svg
                                    viewBox="0 0 24 24"
                                    style={{ width: 14, height: 14 }}
                                >
                                    <path
                                        d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"
                                        fill="#ffffff"
                                    />
                                    <circle
                                        cx="12"
                                        cy="9"
                                        r="2.5"
                                        fill="#3a5a40"
                                    />
                                </svg>
                            </div>

                            {/* Headline Metrics Card */}
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
                                        {assetName}
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

                                <div
                                    style={{
                                        display: "flex",
                                        gap: 16,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontSize: 10,
                                                fontWeight: 700,
                                                color: "#ffffff",
                                            }}
                                        >
                                            {marketValue}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 6,
                                                color: "#a1a1aa",
                                            }}
                                        >
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
                                            {yieldRate}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 6,
                                                color: "#a1a1aa",
                                            }}
                                        >
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
                                            {area}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 6,
                                                color: "#a1a1aa",
                                            }}
                                        >
                                            Area
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
                                            {occupancy}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 6,
                                                color: "#a1a1aa",
                                            }}
                                        >
                                            Occupancy
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

addPropertyControls(EfficuraMiniShowcase, {
    assetName: {
        title: "Asset Name",
        type: ControlType.String,
        defaultValue: "Salesforce Tower",
    },
    marketValue: {
        title: "Market Value",
        type: ControlType.String,
        defaultValue: "$1,400,000,000",
    },
    yieldRate: {
        title: "Yield",
        type: ControlType.String,
        defaultValue: "6.50%",
    },
    occupancy: {
        title: "Occupancy",
        type: ControlType.String,
        defaultValue: "78%",
    },
    area: {
        title: "Area",
        type: ControlType.String,
        defaultValue: "1,420,079 Sq Ft",
    },
})
