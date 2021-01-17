//DOM
const encrypt = document.getElementById('form')
const decrypt = document.getElementById('form-d')
const removeBox = document.getElementById('nav')

//comprueba si hay letras
const isLetter = (str) => {
    return str.length === 1 && str.match(/[a-z]/i);
}
///funcion comprueba si hay numeros
const isNumber = (str) =>{
  let regex=/^[0-9]+$/;
  if(str.match(regex))
      {       			
          return true;
      }
      else{
          alert("Debes ingresar la cantidad de saltos");
          return false;
      }
}

//Evento para encriptar
encrypt.addEventListener('submit', (e)=>{
    e.preventDefault()
	let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

	let text = document.getElementById("scripts").value;
	let offset = parseInt(document.getElementById("num").value);
  
	const textMin = text.toLowerCase();
	let encryptMessage = "";
  
	if(isNumber(document.getElementById("num").value))
	{
		for(let i=0; i < textMin.length; i++)
		{
			let textAct = textMin[i];

			if(!isLetter(textAct)){
				encryptMessage += textAct;
				continue;
			}
			else if(isLetter(textAct))
			{
			
				for(let position=0; position < alphabet.length; position++)
				{
					if(textAct == alphabet[position])
					{
  
						if(position + offset > 25)
						{
							let sumPosition = position + offset;
							let positionNewAlphabet = sumPosition - 25;
  
							encryptMessage += alphabet[positionNewAlphabet]; 
						}
						else
						{
						encryptMessage += alphabet[position + offset];
							break;
						}
					
					}
				}
				continue;
			}
		}

		document.getElementById("results").innerHTML = encryptMessage;
	}				
    encrypt.reset()
})

decrypt.addEventListener('submit', (e)=>{
    e.preventDefault()
	let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

	let text = document.getElementById("scripts-d").value;
	let offset = parseInt(document.getElementById("num").value);
  
	const textMin = text.toLowerCase();
	let encryptMessage = "";
  
	if(isNumber(document.getElementById("num").value))
	{
		for(let i=0; i < textMin.length; i++)
		{
			let textAct = textMin[i];

			if(!isLetter(textAct)){
				encryptMessage += textAct;
				continue;
			}
			else if(isLetter(textAct))
			{
			
				for(let position=0; position < alphabet.length; position++)
				{
					
					if(textAct == alphabet[position])
					{
  
						if(position - offset < 0)
						{
							let sumPosition = position - offset;
							let positionNewAlphabet = sumPosition + 25;
  
							encryptMessage += alphabet[positionNewAlphabet]; 
						}
						else
						{
						
							encryptMessage += alphabet[position - offset];
							break;
						}
					
					}
				}
				continue;
			}
		}

		document.getElementById("result-d").innerHTML = encryptMessage;
	}				
    decrypt.reset()
})

//Evento para limpiar caja de alfabeto
removeBox.addEventListener('submit', (e)=>{
    e.preventDefault()
    removeBox.reset()
})

//Descargar archivo de texto ya encriptado
const downloadTxt = (content, nameArch) => {
    let reader = new FileReader()
    reader.onload = (e) =>{
        let save = document.createElement('a')
        save.href = e.target.result;
        save.download = nameArch || 'archivo.dat';
        let clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
       save.dispatchEvent(clicEvent);
       (window.URL || window.webkitURL).revokeObjectURL(save.href);

    }
    reader.readAsDataURL(content);
}

const getDate = () =>{
    return {
        name: document.getElementById('results').innerHTML
    };
}

const generateDate = (dates) =>{
    let text = [];
    text.push(dates.name);
 
 
    return new Blob(text, {
        type: 'text/plain'
    });
}

document.getElementById('btn-download').addEventListener('click', () => {
    let dates = getDate();
    downloadTxt(generateDate(dates), 'archivo.txt');
 }, false);