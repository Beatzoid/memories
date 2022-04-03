import { NavigateFunction } from "react-router-dom";

import * as api from "../api";
import { AUTH } from "../constants/actionTypes";
import { FormData } from "../types/auth";

export const signin =
    (formData: FormData, navigate: NavigateFunction) =>
    async (dispatch: any) => {
        try {
            const { data } = await api.signin(formData);

            dispatch({ type: "AUTH", data });

            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

export const signup =
    (formData: FormData, navigate: NavigateFunction) =>
    async (dispatch: any) => {
        try {
            const { data } = await api.signup(formData);

            dispatch({ type: "AUTH", data });

            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };
