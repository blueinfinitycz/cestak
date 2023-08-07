import { useRouteError } from "react-router-dom"

export const ErrorPage = () => {
    const error:any = useRouteError();
    console.error(error);

    return(
        <div>
            <h2>Chyba !!! </h2>
            <p>
        <i>{error.statusText || error.message}</i>
      </p>
        </div>
    )
}