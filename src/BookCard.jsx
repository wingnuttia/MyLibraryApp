function BookCard({ book, onClick }) {
  return (
    <div style={styles.card} onClick={onClick}>
      <img
        src={book.coverLocation}
        alt={book.title}
        style={styles.image}
        onError={(e) => {
          e.target.src = "/default.png";
        }}
      />
      <h3 style={styles.title}>{book.title}</h3>
      <p style={styles.author}>by {book.authors}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    width: "100%",
    maxWidth: "100%", // optional cap for wide screens
    boxSizing: "border-box",
    textAlign: "center",
    //border: '1px solid #ccc',
    //borderRadius: '8px',
    //padding: '10px',
    //width: '100%',
    //maxWidth: '200px',
    //textAlign: 'center',
    //margin: '10px',
    //backgroundColor: '#1e1e1e',
    //cursor: 'pointer',
    //transition: 'all 0.3s ease-in-out',
    //overflow: 'hidden',
    //color: 'white',
  },
  expandedCard: {
    minHeight: "450px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "contain",
    borderRadius: "4px",
  },
  title: {
    fontSize: "1.1rem",
    margin: "10px 0 5px",
  },
  author: {
    fontSize: "0.9rem",
    color: "#555",
  },
  details: {
    fontSize: "0.85rem",
    textAlign: "left",
    marginTop: "10px",
    maxHeight: "150px",
    overflowY: "auto",
    padding: "5px",
  },
};

export default BookCard;
