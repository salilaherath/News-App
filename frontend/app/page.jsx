import NewsCard from "./components/NewsCard";

export default function page() {
  return (
    <main>
      <h1>Read News</h1>
      <div className="grid grid-cols-3 gap-x-4">
        <NewsCard />
      </div>
    </main>
  );
}
