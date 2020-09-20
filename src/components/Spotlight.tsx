import React, { useState, useEffect } from "react";
import { ReactComponent as CommandIcon } from "../assets/command.svg";

interface Props {
  visible: boolean;
  onSubmit: Function;
}

const Spotlight = (props: Props) => {
  const { visible = false } = props;
  const [cmd, setCmd] = useState("");

  useEffect(() => {
    // Clear cmd whenever open/close spotlight
    setCmd("");
  }, [visible]);

  const onSpotChange = (e: any) => {
    const text = e.target.value;
    setCmd(text);
  };

  const submit = (e: any) => {
    e.preventDefault();
    if (!cmd) {
      return;
    }

    if (props.onSubmit) {
      props.onSubmit(cmd);
    }
  };

  return visible ? (
    <div className="spot-cont">
      <form onSubmit={(e) => submit(e)}>
        <div className="input_wrapper">
          <div className="input_icon">
            <CommandIcon />
          </div>
          <input
            value={cmd}
            onChange={onSpotChange}
            autoFocus={true}
            placeholder="Type here..."
            autoComplete="false"
          />
        </div>
      </form>
    </div>
  ) : (
    <></>
  );
};

export default Spotlight;
