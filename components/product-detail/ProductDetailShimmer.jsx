export default function ProductDetailShimmer() {
  return (
    <div className="row g-4">
      <div className="col-md-6">
        <div className="shimmer mb-3" style={{ width: "100%", aspectRatio: "1 / 1" }} />
        <div className="d-flex gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="shimmer" style={{ width: 80, height: 80 }} />
          ))}
        </div>
      </div>
      <div className="col-md-6">
        <div className="shimmer shimmer-line" style={{ height: 28, width: "80%" }} />
        <div className="shimmer shimmer-line w-40" />
        <div className="shimmer shimmer-line" style={{ height: 24, width: "30%" }} />
        <div className="shimmer shimmer-line w-60" />
        <div className="shimmer shimmer-line w-60" />
        <div className="shimmer shimmer-line w-40" />
      </div>
    </div>
  );
}
