export default function ProductCardShimmer() {
  return (
    <div className="card-product style-border">
      <div className="shimmer shimmer-card-image" />
      <div className="card-product-info">
        <div className="shimmer shimmer-line w-60" />
        <div className="shimmer shimmer-line w-40" />
      </div>
    </div>
  );
}
