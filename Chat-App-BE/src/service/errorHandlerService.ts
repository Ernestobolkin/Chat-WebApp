import chalk from 'chalk';

export function handleCatchError(error:any, context:string){
    if(error instanceof EvalError){
        console.error(chalk.red(`EvalError in  --> ${context}: ${error.message}`))
    } else if (error instanceof RangeError){
        console.error(chalk.red(`RangeError in  --> ${context}: ${error.message}`))
    }else{
        console.error(chalk.red(`Error in  --> ${context}: ${error.message}`))
    }
    throw error;
}