import chalk from "chalk";
import inquirer from "inquirer";

const apilink:string = "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple";

let fetchData = async (data:string) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let a = await fetchData(apilink);
let startQuiz = async () => {
    let score = 0;
    let name = await inquirer.prompt({
        type:"input",
        name:"fname",
        message:"Enter your name: "
    })
    for (let i = 0; i < 5; i++) {
        let options = [...a[i].incorrect_answers, a[i].correct_answer];
        let ans = await inquirer.prompt({
            type:"list",
            name:"quiz",
            message:chalk.blueBright(a[i].question),
            choices:options
        })
        if(ans.quiz == a[i].correct_answer){
            score++;
        }
    }
    console.log(chalk.greenBright(`Dear ${name.fname}, your score is ${score} out of 5`));
}
startQuiz();
