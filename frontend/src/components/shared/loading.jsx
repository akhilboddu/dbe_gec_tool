import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading(props) {
  return (
    <div className="alert">
      <div>
        <ArrowPathIcon className="h-6 w-6 animate-spin" /> {props.text ?? "Loading..."}
      </div>
    </div>
  );
}
