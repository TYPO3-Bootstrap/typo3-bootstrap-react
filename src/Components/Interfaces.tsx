import React from "react";

export interface TYPO3PageHeadlessDataInterface {
    id: number
    type: string,
    slug: string,
    media: any,
    meta: any,
    categories: string,
    appearance: any,
    content: any;
    navigations: any;
    error?: any | null;
    children?: React.ReactNode
}

export interface TYPO3PagePropsInterface {
    headlessData: TYPO3PageHeadlessDataInterface;
    pageLayouts: any | null;
    pageTemplates: any | null;
    contentElementLayouts: any | null;
    contentElementTemplates: any | null;
    additionalParams: any | null;
    children?: React.ReactNode
}

export interface TYPO3BootstrapContentElementBaseInterface {
    children?: React.ReactNode
    data: any,
    pageProps?: TYPO3PagePropsInterface
}

