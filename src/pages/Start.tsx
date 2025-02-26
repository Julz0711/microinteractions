import RandomizeAppState from "../components/RandomizeAppState";

type StartProps = {};

const Start = (props: StartProps) => {
  return (
    <div className="fixed inset-0 p-5 w-full h-full flex flex-col justify-center items-center text-center">
      <h1>Bachelorarbeit A/B Test</h1>
      <h2 className="mt-2">
        Der Einfluss von Microinteractions auf die User Experience: Eine
        Untersuchung unter Berücksichtigung psychologischer Aspekte der
        Wahrnehmung und intuitiven Interaktion{" "}
      </h2>
      <div className="mt-6">
        <RandomizeAppState />
      </div>
    </div>
  );
};

export default Start;
