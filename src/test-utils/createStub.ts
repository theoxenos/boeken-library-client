import type {ComponentType} from "react";
import {type ActionFunction, createRoutesStub, type LoaderFunction} from "react-router-dom";

interface StubOptions {
    path?: string
    component: ComponentType
    loader?: LoaderFunction
    action?: ActionFunction
    hydrateFallback?: ComponentType
}

export const createStub = ({
                               path = '/',
                               component,
                               loader,
                               action,
                               hydrateFallback
                           }: StubOptions) => {
    return createRoutesStub([
        {
            path,
            Component: component,
            action,
            loader,
            HydrateFallback: hydrateFallback
        }
    ]);
};