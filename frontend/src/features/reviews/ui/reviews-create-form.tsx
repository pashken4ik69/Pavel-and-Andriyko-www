import { useForm } from "react-hook-form";
import { useCreateReviewMutation } from "../../../entities/reviews/api/reviews-api";
import type { IReviewCreate } from "../../../entities/reviews/model/reviews-type";
import { yupResolver } from "@hookform/resolvers/yup";
import { rewiewsCreateSchema } from "../model/reviews-scheme";

function ReviewsCreateForm({ spaceId }: { spaceId: string }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(rewiewsCreateSchema),
    defaultValues: { spaceId },
  });

  const [createReview] = useCreateReviewMutation();

  const submitHandler = async (review: IReviewCreate) => {
    await createReview(review).unwrap();
  };

  return (
    <form className="form" onSubmit={handleSubmit(submitHandler)}>
      <label>
        Текст:
        <input
          placeholder="Введите текст"
          style={errors.text ? { borderColor: "red" } : undefined}
          {...register("text")}
        />
        {errors.text && <p className="error">{errors.text.message}</p>}
      </label>

      <label>
        Рейтинг:
        <input
          placeholder="Введите рейтинг"
          style={errors.rating ? { borderColor: "red" } : undefined}
          type="number"
          {...register("rating")}
        />
        {errors.rating && <p className="error">{errors.rating.message}</p>}
      </label>

      <button type="submit">Создать отзыв</button>
    </form>
  );
}

export default ReviewsCreateForm;
