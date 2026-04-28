import { useAppSelector } from "../../../app/store/store";
import {
  useDeleteReviewMutation,
  useHideReviewMutation,
} from "../api/reviews-api";
import type { IReview } from "../model/reviews-type";

function ReviewsCard({ review }: { review: IReview }) {
  const { user } = useAppSelector((state) => state.auth);
  const [deleteReview] = useDeleteReviewMutation();
  const [hideReview] = useHideReviewMutation();

  return (
    <div>
      <h2>{review.text}</h2>
      <p>рейтинг: {review.rating}</p>
      {user?.role === "manager" && (
        <>
          <button onClick={async () => await deleteReview(review.id).unwrap()}>
            удалить
          </button>
          <button onClick={async () => await hideReview(review.id).unwrap()}>
            срыть
          </button>
        </>
      )}
    </div>
  );
}

export default ReviewsCard;
