import React, {FC} from "react";

const Error: FC = ({children}) => {
    return (
        <div className="w-full h-screen text-center text-3xl uppercase justify-items-center mt-20">
            {children}
        </div>
    );
}

export default Error;