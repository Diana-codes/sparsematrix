const readlineInterface = require('readline');
const fileSystem = require('fs');
const pathModule = require('path');
const CustomSparseMatrix = require('./CustomSparseMatrix');

const rlInterface = readlineInterface.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rlInterface.question("Enter the operation (add, subtract, multiply): ", function(userOperation) {
        rlInterface.question("Enter the path for the first matrix file: ", function(firstMatrixPath) {
            rlInterface.question("Enter the path for the second matrix file: ", function(secondMatrixPath) {
                try {
                    const sparseMatrix1 = CustomSparseMatrix.fromFile(firstMatrixPath);
                    const sparseMatrix2 = CustomSparseMatrix.fromFile(secondMatrixPath);

                    let resultMatrix;
                    switch (userOperation.toLowerCase()) {
                        case 'add':
                            resultMatrix = sparseMatrix1.add(sparseMatrix2);
                            break;
                        case 'subtract':
                            resultMatrix = sparseMatrix1.subtract(sparseMatrix2);
                            break;
                        case 'multiply':
                            resultMatrix = sparseMatrix1.multiply(sparseMatrix2);
                            break;
                        default:
                            console.log("Invalid operation");
                            rlInterface.close();
                            return;
                    }

                    console.log("Result:");
                    console.log(resultMatrix.toString());

                    const outputDirectory = './results';
                    if (!fileSystem.existsSync(outputDirectory)) {
                        fileSystem.mkdirSync(outputDirectory);
                    }

                    const outputFile = pathModule.join(outputDirectory, 'result.txt');
                    fileSystem.writeFileSync(outputFile, resultMatrix.toString(), 'utf8');
                    console.log(`Result saved to ${outputFile}`);
                } catch (err) {
                    console.error(err.message);
                }
                rlInterface.close();
            });
        });
    });
}

promptUser();
