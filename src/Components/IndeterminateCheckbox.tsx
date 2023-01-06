import React from "react";

export const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }:any, ref:any) => {
        const defaultRef = React.useRef<any | void>();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        );
    }
);