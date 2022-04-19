import errorImg from "../../../photo/error-page-img.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <article className="error-page">
      <div className="error-page-text">
        <h1>404</h1>
        <h2>Ой-ей! Вы не должны были это увидеть</h2>
        <span>
          Страница, которую вы ищете не существует.
          <br />
          Вернитесь на <Link to="/">главную</Link> и помните: Вы ничего не
          видели.
        </span>
      </div>
      <img
        className="error-page__item"
        src={errorImg}
        alt="Фотография секретных разработок"
      />
    </article>
  );
};
export default ErrorPage;
