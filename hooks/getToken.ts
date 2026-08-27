'use client';
export const getToken = async()=> {
     const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-token/`,
        {
            method: "GET",
            credentials: "include",
        }
        );
        const data = await res.json();
        return data.token
}