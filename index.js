#! /usr/bin/env node
// Simple ATM application for withdraw of amount or checking balance
// The program uses validate user-entered pin with the default pin 
// Already defined in the program
import inquirer from "inquirer";
let myBalance = 10000; // in $
let myPin = 1234; // to define pin
const pinAnswer = await inquirer.prompt([
    {
        name: "userEnteredPin",
        type: "number",
        message: "Enter Your PIN: "
    }
]);
if (pinAnswer.userEnteredPin === myPin) {
    console.log("Correct pin code!!!");
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "Please select option",
            type: "list",
            choices: ["withdraw", "check balance"]
        }
    ]);
    if (operationAns.operation === "withdraw") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Please select amount to withdraw",
                type: "list",
                choices: [10000, 5000, 3000, 2000, "any other amount"]
            }
        ]);
        if (amountAns.amount === "any other amount") {
            let anyOtherAmount = await inquirer.prompt([
                {
                    name: "OtherAmount",
                    message: "Please enter amount to withdraw",
                    type: "number"
                }
            ]);
            if (anyOtherAmount.OtherAmount <= myBalance) {
                // =, -=, +=
                myBalance -= anyOtherAmount.OtherAmount;
                console.log("Your remaining balance is: " + myBalance);
            }
            else {
                console.log("You have insufficient balance");
            }
        }
        else if (amountAns.amount <= myBalance) {
            // =, -=, +=
            myBalance -= amountAns.amount;
            console.log("Your remaining balance is: " + myBalance);
        }
        else {
            console.log("You have insufficient balance");
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log("Your balance is: " + myBalance);
    }
}
else {
    console.log("Invalid PIN Number");
}
