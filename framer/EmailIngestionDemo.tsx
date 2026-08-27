import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * Efficura - Email Ingestion Demo for Framer
 *
 * Rich Outlook layout + cursor choreography (setTimeout + CSS transitions).
 *
 * @framerIntrinsicWidth 960
 * @framerIntrinsicHeight 600
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */

interface Props {
    style?: React.CSSProperties
    senderName?: string
    dealName?: string
    loop?: boolean
    periodSec?: number
}

const BRAND_GREEN = "#3a5a40"
const OUTLOOK_BLUE = "#0f6cbd"

type MailRow = {
    group?: string
    initials: string
    color: string
    sender: string
    subject: string
    preview: string
    time: string
    unread?: boolean
    selected?: boolean
    attachment?: string
}

function Pointer() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden
            style={{
                width: 14,
                height: 14,
                display: "block",
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
    )
}

function Avatar({
    initials,
    color,
    size = 22,
}: {
    initials: string
    color: string
    size?: number
}) {
    return (
        <span
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: color,
                color: "#ffffff",
                display: "grid",
                placeItems: "center",
                fontSize: size * 0.34,
                fontWeight: 600,
                flexShrink: 0,
            }}
        >
            {initials}
        </span>
    )
}

function Bar({ width = "100%" }: { width?: string }) {
    return (
        <div
            style={{
                height: 4,
                borderRadius: 9999,
                backgroundColor: "#f4f4f5",
                width,
            }}
        />
    )
}

function useEmailAnimation(loopKey: number) {
    const [rowHighlight, setRowHighlight] = React.useState(false)
    const [readingVisible, setReadingVisible] = React.useState(false)
    const [cursorMoved, setCursorMoved] = React.useState(false)
    const [cursorClick, setCursorClick] = React.useState(false)
    const [sent, setSent] = React.useState(false)
    const [toastVisible, setToastVisible] = React.useState(false)

    React.useEffect(() => {
        setRowHighlight(false)
        setReadingVisible(false)
        setCursorMoved(false)
        setCursorClick(false)
        setSent(false)
        setToastVisible(false)

        const timers = [
            setTimeout(() => setCursorClick(true), 300),
            setTimeout(() => setCursorClick(false), 480),
            setTimeout(() => setRowHighlight(true), 450),
            setTimeout(() => setReadingVisible(true), 1150),
            setTimeout(() => setCursorMoved(true), 2000),
            setTimeout(() => setCursorClick(true), 3250),
            setTimeout(() => {
                setCursorClick(false)
                setSent(true)
            }, 3450),
            setTimeout(() => setToastVisible(true), 3700),
        ]

        return () => timers.forEach(clearTimeout)
    }, [loopKey])

    return {
        rowHighlight,
        readingVisible,
        cursorMoved,
        cursorClick,
        sent,
        toastVisible,
    }
}

function OutlookAnimated({
    loopKey,
    senderName,
    dealName,
}: {
    loopKey: number
    senderName: string
    dealName: string
}) {
    const anim = useEmailAnimation(loopKey)

    const mailRows: MailRow[] = [
        {
            group: "This week",
            initials: "JW",
            color: "#7719aa",
            sender: "James Whitfield",
            subject: "Priverd Lane Portfolio",
            preview: "Good morning both, can I check where we…",
            time: "10:20",
            unread: true,
        },
        {
            initials: "EL",
            color: OUTLOOK_BLUE,
            sender: senderName,
            subject: `${dealName} - facility pack`,
            preview: "Hi team, as promised, please see the attach…",
            time: "08:55",
            selected: true,
            attachment: `${dealName.slice(0, 12)} fl…`,
        },
        {
            group: "Last week",
            initials: "MW",
            color: "#0b6a0b",
            sender: "Marcus Webb",
            subject: "Granary Wharf | term sheet v3",
            preview: "Clean version attached, redline to follow o…",
            time: "Fri 26/06",
            attachment: "Granary Whar…",
        },
        {
            initials: "HP",
            color: "#ca5010",
            sender: "Helen Price",
            subject: "Project Alder - facility drawdown",
            preview: "Drawdown notice attached, contingency n…",
            time: "Wed 24/06",
        },
        {
            initials: "AR",
            color: "#8661c5",
            sender: "Anita Rao",
            subject: "Weaver's Cross - bridge facility terms",
            preview: "Sharing the indicative terms discussed, su…",
            time: "Tue 23/06",
            unread: true,
        },
        {
            initials: "CD",
            color: "#498205",
            sender: "Chris Dalton",
            subject: "Kings Dock | PBSA senior debt",
            preview: "Hi team, following our call yesterday, the s…",
            time: "Tue 23/06",
        },
    ]

    const accountFolders = [
        { name: "Inbox", count: "22", selected: true },
        { name: "Drafts", count: "[5]" },
        { name: "Sent Items" },
        { name: "Deleted Items", count: "3" },
        { name: "Junk Email" },
    ]

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontSize: 10,
                color: "#18181b",
            }}
        >
            {/* Title bar */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: 32,
                    padding: "0 12px",
                    borderBottom: "1px solid #e4e4e7",
                    flexShrink: 0,
                    position: "relative",
                }}
            >
                <div style={{ display: "flex", gap: 6 }}>
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor: "#71717a",
                            }}
                        />
                    ))}
                </div>
                <span
                    style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 10,
                        color: "#71717a",
                        border: "1px solid #e4e4e7",
                        borderRadius: 4,
                        padding: "2px 10px",
                    }}
                >
                    outlook.office.com/mail
                </span>
            </div>

            {/* Body */}
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flex: 1,
                    minHeight: 0,
                }}
            >
                {/* Module rail */}
                <div
                    style={{
                        width: 34,
                        borderRight: "1px solid #f4f4f5",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 12,
                        paddingTop: 10,
                        flexShrink: 0,
                        color: "#a1a1aa",
                        fontSize: 11,
                    }}
                >
                    <span style={{ color: OUTLOOK_BLUE }}>✉</span>
                    <span>📅</span>
                    <span>👥</span>
                    <span>✓</span>
                    <span style={{ fontSize: 9, letterSpacing: -1 }}>⋮⋮⋮</span>
                </div>

                {/* Menu + ribbon + panes */}
                <div
                    style={{
                        display: "flex",
                        minWidth: 0,
                        flex: 1,
                        flexDirection: "column",
                    }}
                >
                    {/* Menu row */}
                    <div
                        style={{
                            display: "flex",
                            height: 26,
                            flexShrink: 0,
                            alignItems: "center",
                            gap: 12,
                            padding: "0 10px",
                            fontSize: 9,
                            color: "#52525b",
                            borderBottom: "1px solid #f4f4f5",
                        }}
                    >
                        <span style={{ color: "#71717a" }}>☰</span>
                        <span>File</span>
                        <span
                            style={{
                                position: "relative",
                                fontWeight: 600,
                                color: "#18181b",
                            }}
                        >
                            Home
                            <span
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    right: 0,
                                    bottom: -4,
                                    height: 2,
                                    borderRadius: 9999,
                                    backgroundColor: OUTLOOK_BLUE,
                                }}
                            />
                        </span>
                        <span>View</span>
                        <span>Help</span>
                    </div>

                    {/* Ribbon */}
                    <div
                        style={{
                            display: "flex",
                            flexShrink: 0,
                            alignItems: "stretch",
                            overflow: "hidden",
                            borderBottom: "1px solid #f4f4f5",
                            padding: "0 4px",
                            height: 52,
                        }}
                    >
                        {[
                            {
                                caption: "New",
                                label: "New",
                                tint: OUTLOOK_BLUE,
                            },
                            { caption: "Delete", label: "Delete" },
                            {
                                caption: "Respond",
                                label: "Reply",
                                tint: "#8661c5",
                            },
                            {
                                caption: "Add-ins",
                                label: "Send to labrador",
                                brand: true,
                            },
                        ].map((item) => (
                            <div
                                key={item.caption}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRight: "1px solid #f4f4f5",
                                    padding: "0 6px",
                                    minWidth: item.brand ? 58 : 44,
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        alignItems: "flex-start",
                                        justifyContent: "center",
                                        paddingTop: 6,
                                    }}
                                >
                                    {item.brand ? (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: 3,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: 2,
                                                    backgroundColor:
                                                        BRAND_GREEN,
                                                    color: "#fff",
                                                    display: "grid",
                                                    placeItems: "center",
                                                    fontSize: 7,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                E
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: 6,
                                                    lineHeight: 1.2,
                                                    color: "#52525b",
                                                    textAlign: "center",
                                                }}
                                            >
                                                Send to labrador
                                            </span>
                                        </div>
                                    ) : (
                                        <span
                                            style={{
                                                fontSize: 7,
                                                color: item.tint ?? "#52525b",
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                    )}
                                </div>
                                <span
                                    style={{
                                        fontSize: 6,
                                        color: "#a1a1aa",
                                        textAlign: "center",
                                        paddingBottom: 3,
                                    }}
                                >
                                    {item.caption}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Panes row */}
                    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
                        {/* Folder pane */}
                        <div
                            style={{
                                width: 108,
                                borderRight: "1px solid #f4f4f5",
                                padding: 6,
                                flexShrink: 0,
                                backgroundColor: "#fafafa",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: 600,
                                    marginBottom: 4,
                                    fontSize: 8,
                                    color: "#27272a",
                                }}
                            >
                                ▾ Favourites
                            </div>
                            <div
                                style={{
                                    padding: "3px 5px",
                                    borderRadius: 4,
                                    backgroundColor: "#d5e4f2",
                                    fontWeight: 600,
                                    fontSize: 8,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: 2,
                                }}
                            >
                                <span>Inbox</span>
                                <span style={{ color: OUTLOOK_BLUE }}>22</span>
                            </div>
                            <div
                                style={{
                                    padding: "3px 5px",
                                    fontSize: 8,
                                    color: "#71717a",
                                }}
                            >
                                Sent Items
                            </div>
                            <div
                                style={{
                                    padding: "3px 5px",
                                    fontSize: 8,
                                    color: "#71717a",
                                    marginBottom: 6,
                                }}
                            >
                                Drafts [5]
                            </div>
                            <div
                                style={{
                                    fontWeight: 600,
                                    marginBottom: 4,
                                    fontSize: 8,
                                    color: "#27272a",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                ▾ you@efficura.com
                            </div>
                            {accountFolders.map((f) => (
                                <div
                                    key={f.name}
                                    style={{
                                        padding: "3px 5px",
                                        borderRadius: 4,
                                        fontSize: 8,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        backgroundColor: f.selected
                                            ? "#d5e4f2"
                                            : "transparent",
                                        fontWeight: f.selected ? 600 : 400,
                                        color: f.selected ? "#18181b" : "#71717a",
                                    }}
                                >
                                    <span
                                        style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {f.name}
                                    </span>
                                    {f.count && (
                                        <span
                                            style={{
                                                color: f.selected
                                                    ? OUTLOOK_BLUE
                                                    : "#a1a1aa",
                                            }}
                                        >
                                            {f.count}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Message list */}
                        <div
                            style={{
                                width: 148,
                                borderRight: "1px solid #e4e4e7",
                                flexShrink: 0,
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    height: 28,
                                    flexShrink: 0,
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "0 8px",
                                    fontSize: 9,
                                    borderBottom: "1px solid #f4f4f5",
                                }}
                            >
                                <span
                                    style={{
                                        position: "relative",
                                        fontWeight: 600,
                                        color: "#18181b",
                                    }}
                                >
                                    Focused
                                    <span
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            bottom: -6,
                                            height: 2,
                                            borderRadius: 9999,
                                            backgroundColor: OUTLOOK_BLUE,
                                        }}
                                    />
                                </span>
                                <span style={{ color: "#71717a" }}>Other</span>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    overflow: "hidden",
                                }}
                            >
                                {mailRows.map((row) => (
                                    <React.Fragment
                                        key={`${row.sender}-${row.subject}`}
                                    >
                                        {row.group && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 4,
                                                    padding: "6px 8px 2px",
                                                    fontSize: 8,
                                                    fontWeight: 600,
                                                    color: "#3f3f46",
                                                }}
                                            >
                                                ▾ {row.group}
                                            </div>
                                        )}
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                                gap: 6,
                                                padding: "5px 8px",
                                                backgroundColor:
                                                    row.selected &&
                                                    anim.rowHighlight
                                                        ? "#f4f4f5"
                                                        : "transparent",
                                                borderLeft:
                                                    row.selected &&
                                                    anim.rowHighlight
                                                        ? `2px solid ${OUTLOOK_BLUE}`
                                                        : "2px solid transparent",
                                                transition:
                                                    "background-color 0.25s ease, border-color 0.25s ease",
                                            }}
                                        >
                                            {row.unread && (
                                                <span
                                                    style={{
                                                        position: "absolute",
                                                        top: 4,
                                                        bottom: 4,
                                                        left: 0,
                                                        width: 2,
                                                        borderTopRightRadius: 2,
                                                        borderBottomRightRadius: 2,
                                                        backgroundColor:
                                                            OUTLOOK_BLUE,
                                                    }}
                                                />
                                            )}
                                            <Avatar
                                                initials={row.initials}
                                                color={row.color}
                                                size={20}
                                            />
                                            <div
                                                style={{
                                                    minWidth: 0,
                                                    flex: 1,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        gap: 4,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: 600,
                                                            fontSize: 8,
                                                            overflow: "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        {row.sender}
                                                    </span>
                                                    <span
                                                        style={{
                                                            flexShrink: 0,
                                                            fontSize: 7,
                                                            color: row.unread
                                                                ? OUTLOOK_BLUE
                                                                : "#a1a1aa",
                                                            fontWeight:
                                                                row.unread
                                                                    ? 600
                                                                    : 400,
                                                        }}
                                                    >
                                                        {row.time}
                                                    </span>
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: 8,
                                                        fontWeight: row.unread
                                                            ? 600
                                                            : 400,
                                                        color: row.unread
                                                            ? OUTLOOK_BLUE
                                                            : "#52525b",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {row.subject}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: 7,
                                                        color: "#a1a1aa",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {row.preview}
                                                </div>
                                                {row.attachment && (
                                                    <div
                                                        style={{
                                                            marginTop: 3,
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: 3,
                                                            borderRadius: 3,
                                                            border: "1px solid #e4e4e7",
                                                            backgroundColor:
                                                                "#ffffff",
                                                            padding: "1px 4px",
                                                            fontSize: 6,
                                                            color: "#71717a",
                                                        }}
                                                    >
                                                        📄 {row.attachment}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Reading pane */}
                        <div
                            style={{
                                flex: 1,
                                minWidth: 0,
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                                opacity: anim.readingVisible ? 1 : 0,
                                transition: "opacity 0.45s ease",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    borderBottom: "1px solid #f4f4f5",
                                    padding: "8px 12px",
                                    flexShrink: 0,
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 10,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {dealName} - facility pack
                                </span>
                                <span
                                    style={{
                                        marginLeft: "auto",
                                        flexShrink: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 3,
                                        borderRadius: 4,
                                        border: "1px solid #e4e4e7",
                                        padding: "2px 6px",
                                        fontSize: 7,
                                        color: "#52525b",
                                    }}
                                >
                                    ✨ Summarise this email
                                </span>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    overflow: "hidden",
                                    padding: "8px 12px",
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 8,
                                        fontWeight: 500,
                                        color: OUTLOOK_BLUE,
                                    }}
                                >
                                    ▾ Hide message history
                                </p>
                                <p
                                    style={{
                                        margin: "8px 0 0",
                                        fontSize: 8,
                                        color: "#a1a1aa",
                                    }}
                                >
                                    On Mon, 29 Jun at 08:55, {senderName} &lt;
                                    <span
                                        style={{
                                            textDecoration: "underline",
                                            color: OUTLOOK_BLUE,
                                        }}
                                    >
                                        ed.lawson@excap.example
                                    </span>
                                    &gt; wrote:
                                </p>
                                <div
                                    style={{
                                        marginTop: 8,
                                        fontSize: 9,
                                        lineHeight: 1.55,
                                        color: "#52525b",
                                    }}
                                >
                                    <p style={{ margin: "0 0 6px" }}>Hi team,</p>
                                    <p style={{ margin: "0 0 6px" }}>
                                        As promised, please see the attached pack
                                        in a high-level format. It should be
                                        enough to get to broad figures ahead of
                                        the detailed model.
                                    </p>
                                    <p style={{ margin: "0 0 2px" }}>
                                        - 120 Key Hotel
                                    </p>
                                    <p style={{ margin: "0 0 2px" }}>
                                        - £48.5m senior facility
                                    </p>
                                    <p style={{ margin: "0 0 2px" }}>
                                        - £83.0m GDV
                                    </p>
                                    <p style={{ margin: "0 0 2px" }}>
                                        - 58.4% LTV
                                    </p>
                                    <p style={{ margin: "0 0 6px" }}>
                                        - Stage 2 cost plan and appraisal
                                        attached
                                    </p>
                                    <p
                                        style={{
                                            margin: "0 0 4px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Timings:
                                    </p>
                                    <p style={{ margin: "0 0 2px" }}>
                                        - Exclusivity fee committed within the
                                        next 4 weeks.
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        - Exchange end Sept STPP, completion 30
                                        days after planning.
                                    </p>
                                </div>
                                <div
                                    style={{
                                        marginTop: 10,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 4,
                                    }}
                                >
                                    <Bar width="92%" />
                                    <Bar width="72%" />
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 4,
                                    padding: "6px 12px 10px",
                                    flexShrink: 0,
                                }}
                            >
                                {[
                                    "Floorplan pack.pdf",
                                    "Cost plan.xlsx",
                                    "Appraisal.pdf",
                                ].map((f) => (
                                    <span
                                        key={f}
                                        style={{
                                            borderRadius: 4,
                                            border: "1px solid #e4e4e7",
                                            backgroundColor: "#fafafa",
                                            padding: "2px 6px",
                                            fontSize: 7,
                                            color: "#71717a",
                                        }}
                                    >
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Apps panel */}
                <div
                    style={{
                        width: 128,
                        borderLeft: "1px solid #e4e4e7",
                        padding: 10,
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: 600,
                            fontSize: 9,
                            marginBottom: 8,
                        }}
                    >
                        Apps
                        <span style={{ color: "#a1a1aa", fontSize: 8 }}>✕</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 9,
                            fontWeight: 600,
                            marginBottom: 10,
                        }}
                    >
                        <span
                            style={{
                                width: 12,
                                height: 12,
                                borderRadius: 2,
                                backgroundColor: BRAND_GREEN,
                                color: "#fff",
                                display: "grid",
                                placeItems: "center",
                                fontSize: 7,
                                fontWeight: 700,
                            }}
                        >
                            E
                        </span>
                        Send to labrador
                    </div>
                    <div
                        style={{
                            padding: "6px 8px",
                            borderRadius: 4,
                            backgroundColor: anim.sent ? BRAND_GREEN : "#18181b",
                            color: "#fff",
                            fontSize: 8,
                            fontWeight: 600,
                            textAlign: "center",
                            transform:
                                anim.cursorClick && anim.cursorMoved
                                    ? "scale(0.94)"
                                    : "scale(1)",
                            transition:
                                "transform 0.15s ease, background-color 0.2s ease",
                        }}
                    >
                        {anim.sent ? "✓ Sent!" : "+ Create new deal"}
                    </div>
                    <div
                        style={{
                            marginTop: 4,
                            padding: "6px 8px",
                            borderRadius: 4,
                            border: "1px solid #e4e4e7",
                            color: "#71717a",
                            fontSize: 8,
                            textAlign: "center",
                        }}
                    >
                        File to existing deal
                    </div>
                    <div
                        style={{
                            marginTop: 8,
                            padding: "4px 6px",
                            borderRadius: 4,
                            backgroundColor: "rgba(58, 90, 64, 0.12)",
                            border: "1px solid rgba(58, 90, 64, 0.3)",
                            color: BRAND_GREEN,
                            fontSize: 7,
                            fontWeight: 600,
                            opacity: anim.toastVisible ? 1 : 0,
                            transform: anim.toastVisible
                                ? "translateY(0)"
                                : "translateY(4px)",
                            transition:
                                "opacity 0.35s ease, transform 0.35s ease",
                        }}
                    >
                        ✓ Deal created: {dealName}
                    </div>
                </div>

                {/* Animated cursor */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        zIndex: 20,
                        pointerEvents: "none",
                        left: anim.cursorMoved ? "88%" : "26%",
                        top: anim.cursorMoved ? "18%" : "48%",
                        transform: anim.cursorClick ? "scale(0.82)" : "scale(1)",
                        transition: anim.cursorMoved
                            ? "left 1.2s cubic-bezier(0.22, 1, 0.36, 1), top 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 0.15s ease"
                            : "transform 0.15s ease",
                    }}
                >
                    <Pointer />
                </div>
            </div>
        </div>
    )
}

export default function EfficuraEmailIngestionDemo(props: Props) {
    const {
        style,
        senderName = "Ed Lawson",
        dealName = "Harbour Yard",
        loop = true,
        periodSec = 6.5,
    } = props

    const [loopKey, setLoopKey] = React.useState(0)

    React.useEffect(() => {
        if (!loop) return
        const id = setInterval(
            () => setLoopKey((n) => n + 1),
            periodSec * 1000
        )
        return () => clearInterval(id)
    }, [loop, periodSec])

    return (
        <div
            style={{
                ...style,
                width: 960,
                height: 600,
                boxSizing: "border-box",
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.1)",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                boxShadow: "0 24px 60px -24px rgba(48, 50, 54, 0.45)",
            }}
        >
            <OutlookAnimated
                key={loopKey}
                loopKey={loopKey}
                senderName={senderName}
                dealName={dealName}
            />
        </div>
    )
}

addPropertyControls(EfficuraEmailIngestionDemo, {
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
    loop: {
        title: "Loop Animation",
        type: ControlType.Boolean,
        defaultValue: true,
    },
    periodSec: {
        title: "Loop (sec)",
        type: ControlType.Number,
        defaultValue: 6.5,
        min: 4,
        max: 20,
        step: 0.5,
        unit: "s",
        hidden(props) {
            return props.loop === false
        },
    },
})
