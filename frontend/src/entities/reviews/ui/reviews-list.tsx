
import { useGetReviewsManageQuery } from "../api/reviews-api";
import ReviewsCard from "./reviews-card";

function ReviewsList({ spaceId }: { spaceId: string }) {
  const { data: reviews } = useGetReviewsManageQuery(spaceId!);

  return (
    <div>
      {reviews?.map((review) => (
        <ReviewsCard key={review.id} review={review} />
      ))}
    </div>
  );
}

export default ReviewsList;
