import Quiz from "@/components/Quiz";
import type { Quiz as QuizType } from "@/types";

async function getData(): Promise<QuizType> {
	const res = await fetch("http://localhost:8000/api/quiz/1", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4NzAxODkyLCJleHAiOjE2ODg3ODgyOTJ9.qCz-8xnTnqSg4nkNLy2Pw1F-wt5y7fuUXsh-0kLG_oI",
		},
	});
	return res.json();
}

export default async function Home() {
	const data = await getData();
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md max-w-md">
				<Quiz questions={data.questions} />
			</div>
		</div>
	);
}
