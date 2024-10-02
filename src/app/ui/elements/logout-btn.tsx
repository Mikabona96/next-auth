"use client";
import { logout } from "@/app/actions/logout";
import { useFormState } from "react-dom";

export function LogoutButton() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [state, dispatch] = useFormState(logout, undefined);

	return (
		<form action={dispatch}>
			<button className='rounded-md bg-red-500 px-4 py-2 text-white'>
				Logout
			</button>
			{state?.error && (
				<p className='text-xs text-red-600'>{state.error}</p>
			)}
		</form>
	);
}
