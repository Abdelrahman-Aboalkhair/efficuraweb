import styles from "./CardBlobs.module.css";

/**
 * Decorative drifting-blob + film-grain layer for a card. The card supplies its
 * own solid base colour; this only adds movement in related hues, so the card
 * stays primarily that colour. Sits behind the card content (negative z-index),
 * so the card must set `relative isolate overflow-hidden`.
 *
 * `variant` picks the palette: "violet" tints around the brand violet, "light"
 * uses pale violet-leaning pastels over white, and "slate" uses cool pale grays
 * over a light bluish-gray base.
 */
export function CardBlobs({
  variant,
}: {
  variant: "violet" | "light" | "slate";
}) {
  return (
    <div aria-hidden className={`${styles.blobs} ${styles[variant]}`}>
      <span className={`${styles.blob} ${styles.blob1}`} />
      <span className={`${styles.blob} ${styles.blob2}`} />
      <span className={`${styles.blob} ${styles.blob3}`} />
      <span className={`${styles.blob} ${styles.blob4}`} />
      <div className={styles.grain} />
    </div>
  );
}
