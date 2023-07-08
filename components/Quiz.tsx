"use client";

import { useState } from "react";
import type { Quiz, Question, Answer } from "@/types";
// import jsonwebtoken
import jwt from "jsonwebtoken";

export default function Quiz({ questions }: { questions: Array<Question> }) {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [showResult, setShowResult] = useState(false);

	const handleAnswer = (selectedOption: any) => {
		questions[currentQuestion].answers.forEach((answer: Answer) => {
			if (answer.id === selectedOption && answer.isCorrect) {
				setScore((prevScore) => prevScore + 1);
			}
		});

		if (currentQuestion === questions.length - 1) {
			setShowResult(true);
			saveScore();
		} else {
			setCurrentQuestion((prevQuestion) => prevQuestion + 1);
		}
	};

	const saveScore = async () => {
		const { id } = jwt.decode(localStorage.getItem("token")!);
		try {
			const res = await fetch("http://localhost:8000/api/quiz/scores", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + localStorage.getItem("token"),
				},
				body: JSON.stringify({
					score: score,
					quizId: 1,
					userId: id,
				}),
			});

			const data = await res.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	const restartQuiz = () => {
		setCurrentQuestion(0);
		setScore(0);
		setShowResult(false);
	};

	return (
		<div>
			{!showResult ? (
				<>
					<h1 className="text-2xl font-bold mb-4">Mini Quiz App</h1>
					<h2 className="text-lg font-medium mb-4">
						{questions[currentQuestion].question}
					</h2>
					<div className="space-y-2">
						{questions[currentQuestion].answers.map((answer, index) => (
							<button
								key={index}
								className="bg-blue-500 text-white py-2 px-4 rounded"
								onClick={() => handleAnswer(answer.id)}
							>
								{answer.answer}
							</button>
						))}
					</div>
				</>
			) : (
				<>
					<h1 className="text-2xl font-bold mb-4">Quiz Result</h1>
					<p className="text-lg mb-4">
						You scored {score} out of {questions.length}!
					</p>
					<button
						className="bg-blue-500 text-white py-2 px-4 rounded"
						onClick={restartQuiz}
					>
						Restart Quiz
					</button>
				</>
			)}
		</div>
	);
}
