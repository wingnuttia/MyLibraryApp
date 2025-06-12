import React from "react";

function BookModal({ book, onClose }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeBtn}>
          ✖
        </button>

        <div style={styles.header}>
          <img
            src={book.coverLocation}
            alt={book.title}
            style={styles.cover}
            onError={(e) => {
              e.target.src = "/default.png";
            }}
          />
          <div style={styles.meta}>
            <h2 style={styles.title}>{book.title}</h2>
            <p>
              <strong>Author:</strong> {book.authors}
            </p>
            <p>
              <strong>Series:</strong>{" "}
              {book.series
                ? `${book.series} ${
                    book.series_index ? `(#${book.series_index})` : ""
                  }`
                : "Standalone"}
            </p>
            <p>
              <strong>Tags:</strong> {book.tags || "—"}
            </p>
          </div>
        </div>

        <div style={styles.summary}>
          <p>
            <strong>Summary:</strong>
          </p>
          <p style={styles.summaryText}>
            {book.comments || "No summary available."}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#1e1e1e",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    color: "white",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    marginBottom: "20px",
  },
  cover: {
    width: "200px",
    height: "auto",
    borderRadius: "4px",
    objectFit: "cover",
  },
  meta: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    marginBottom: "10px",
  },
  summary: {
    fontSize: "0.95rem",
    lineHeight: "1.5",
  },
  summaryText: {
    marginTop: "10px",
    whiteSpace: "pre-wrap",
  },
};

export default BookModal;
