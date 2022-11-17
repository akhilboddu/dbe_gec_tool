import { Link } from "@tanstack/react-location";

export default function CourseCard({ test, }) {
  return (
    <div className="card card-bordered w-full bg-base-300 lg:aspect-2/1">
      <div className="card-body">
        <h3 className="card-title">{test.Title}</h3>

        <div className="lg:relative lg:flex-1">
          <p className="lg:absolute lg:inset-0 lg:overflow-hidden">
            {test.description}
          </p>
        </div>

        
        <div className="card-actions justify-end">
          <div className="btn btn-mainColor">
            {test.duration}
          </div>

          <Link to={`/tests/${test.testId}`} className="btn">
            Take Test
          </Link>
        </div>
      </div>
    </div>
  );
}
