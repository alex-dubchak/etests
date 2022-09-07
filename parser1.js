const fs = require('fs');

parseQuestion = function(arr){
    
    const question = arr[0];
    var answers = arr.slice(1).map((value)=>{
        var val = value.trim();
        if (val[0] == '+'){
            return {
                value: val.substring(1),
                correct: true
            }
        }else{
            return {
                value: val
            }
        }
    });
    return{
        question,
        answers
    }
}


fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    var dataAr = data.split('\n');
    
    const result = [];
    var level = 0;
    var sectionName = '';
    var subSectionName = '';
    var questionArr = [];
    dataAr.forEach((line, idx, arr) => {
        if (line === '') return;

        if (level == 2){
            questionArr.push(line);
        }

        if (arr[idx + 1] === ''){
            if (level == 0){
                sectionName = line;
                level++;
                //result[sectionName] = {};
                console.log('section', sectionName);
                
            }else if (level == 1){
                subSectionName = line;
                level++;
                //result[sectionName][subSectionName] = {};
                console.log('subSection', subSectionName);
            }else if (level = 2){
                var {question, answers} = parseQuestion(questionArr);
                //result[sectionName][subSectionName][question] = answers;
                result.push({
                    section: sectionName,
                    subSection: subSectionName,
                    question,
                    answers
                })
                questionArr = [];

                if (arr[idx + 3] == ''){ // end of subsection
                    //console.log('end of subsection');
                    //console.log(arr.slice(idx-3, idx + 6));
                    //console.log();
                    level--;
                }
                if (arr[idx + 5] == ''){// end of section
                    console.log();
                    level--;
                }
            }
            
        }

    });
    console.log(result);

    let jsonRes = JSON.stringify(result);
    console.log(result);
    //fs.writeFileSync('data.json', jsonRes);

  });

