import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import BookModal from "./BookModal";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    fetch("/BooklistFixed.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedBooks = data.sort((a, b) => {
          const authorA = (a.authors || "").toLowerCase();
          const authorB = (b.authors || "").toLowerCase();

          if (authorA < authorB) return -1;
          if (authorA > authorB) return 1;

          const seriesA = (a.series || "").toLowerCase();
          const seriesB = (b.series || "").toLowerCase();

          if (seriesA < seriesB) return -1;
          if (seriesA > seriesB) return 1;

          const indexA = a.series_index ?? Number.MAX_VALUE;
          const indexB = b.series_index ?? Number.MAX_VALUE;

          if (indexA < indexB) return -1;
          if (indexA > indexB) return 1;

          const titleA = (a.title || "").toLowerCase();
          const titleB = (b.title || "").toLowerCase();

          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;

          return 0;
        });

        setBooks(sortedBooks);
      })
      .catch((error) => console.error("Error loading books:", error));
  }, []);

  //  Extract unique values for filters
  const authors = [
    ...new Set(
      books.flatMap((b) =>
        (b.authors || "")
          .split("&")
          .map((a) => a.trim())
          .filter(Boolean)
      )
    ),
  ].sort();
  const seriesList = [
    ...new Set(books.map((b) => b.series).filter(Boolean)),
  ].sort();
  const tagList = [
    ...new Set(
      books.flatMap((b) => (b.tags || "").split(",").map((tag) => tag.trim()))
    ),
  ]
    .filter(Boolean)
    .sort();

  const filteredBooks = books.filter((book) => {
    const lowerSearch = search.toLowerCase();
    const matchesSearch =
      (book.title && book.title.toLowerCase().includes(lowerSearch)) ||
      (book.authors && book.authors.toLowerCase().includes(lowerSearch)) ||
      (book.series && book.series.toLowerCase().includes(lowerSearch)) ||
      (book.summary && book.summary.toLowerCase().includes(lowerSearch)) ||
      (book.tags && book.tags.toLowerCase().includes(lowerSearch));

    const matchesAuthor = !selectedAuthor || book.authors === selectedAuthor;
    const matchesSeries = !selectedSeries || book.series === selectedSeries;
    const matchesTag =
      !selectedTag ||
      (book.tags &&
        book.tags
          .toLowerCase()
          .split(",")
          .map((t) => t.trim())
          .includes(selectedTag.toLowerCase()));

    return matchesSearch && matchesAuthor && matchesSeries && matchesTag;
  });

  const clearFilters = () => {
    setSearch("");
    setSelectedAuthor("");
    setSelectedSeries("");
    setSelectedTag("");
  };

  return (
    <div style={styles.container}>
      <h1>My Book Library</h1>

      {/*  Search input */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.filters}>
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          <select
            value={selectedSeries}
            onChange={(e) => setSelectedSeries(e.target.value)}
          >
            <option value="">All Series</option>
            {seriesList.map((series) => (
              <option key={series} value={series}>
                {series}
              </option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">All Tags</option>
            {tagList.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <button onClick={clearFilters} style={styles.clearButton}>
            Clear Filters
          </button>
        </div>
      </div>

      <div style={styles.grid}>
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClick={() => setSelectedBook(book)}
          />
        ))}
      </div>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    width: "100%", //  full width
    maxWidth: "100%", //  allow stretching
    margin: "0 auto ",
    overflowX: "hidden",
    boxSizing: "border-box",
  },
  filterContainer: {
    width: "100%",
    maxWidth: "400px", // ~2 card widths including gaps
    margin: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  search: {
    width: "100%",
    padding: "10px",
    fontSize: "1rem",
    marginBottom: "10px",
  },
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "20px",
    width: "100%",
    padding: "0 10px",
    boxSizing: "border-box",
  },
  clearButton: {
    padding: "8px 12px",
    fontSize: "0.9rem",
    cursor: "pointer",
    marginTop: "10px",
    alignSelf: "flex-start", // aligns button to the left
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};

export default App;
