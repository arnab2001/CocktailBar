
const text=document.getElementById('drinks');
const drinkName=document.getElementById('Drink_name');

function getCocktail(){
   

    while(text.firstChild){
        text.removeChild(text.firstChild);
   }
   
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName.value.trim()}`;
    fetch(apiUrl)
    .then(
    function(response) {
        if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
              
            console.log(data);
            
       data.drinks.forEach(element => {
            
           const btn=document.createElement('button');
           
           const addd_data= text.appendChild(btn);
           btn.className='btn btn-primary';
           const info=document.createElement('div');
          const img=document.createElement('img');
           addd_data.className="drinkButton";
           addd_data.id="drinkButton";
           addd_data.href = "https://www.thecocktaildb.com/drink/"+element.idDrink;
           addd_data.innerHTML=element.strDrink;

         
           
           info.innerHTML=`<h1>Name: ${element.strDrink}</h1>  <p>Category: ${element.strCategory} / type: ${element.strAlcoholic}</p><p>Glass: ${element.strGlass} <p>`;
           info.className='hide';
           img.className='hide'
           img.id = "img";
           img.src=`${element.strDrinkThumb}`;
           text.appendChild(info);
        text.appendChild(img);
        
        
        document.createElement('br');

        text.appendChild(document.createElement('br'));
        

        const ingrd = info.appendChild(document.createElement('div'));
        ingrd.className='ingrd';
        ingrd.innerHTML=`<h3>Ingredients: </h3>`;
        const dummyArr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        let i = 1;
        dummyArr.forEach(el=>{
        const ing=document.createElement('div');

            ing.className='ing';
            const empty = " ";
            const tmp= element['strIngredient'+el];
            const temp1 = element['strMeasure'+el];
            
           tmp?ing.innerHTML=`${empty}${i}.${tmp}${empty}${temp1}&#160`:null;
              ingrd.appendChild(ing);
           i++
         
     
           
        })
      
        
        
        const desc = document.createElement('div');
        desc.className='hide desc';
        desc.innerHTML=`Instructions:${element.strInstructions}`;
        text.appendChild(desc);

        
        

        
        // if(element.strIngredient{i}==null){
            
        // }

        btn.addEventListener('click',()=>{
             info.classList.toggle('show');
             img.classList.toggle('show');
             desc.classList.toggle('show');
                ingrd.classList.toggle('show');
            

        })
        
        });
    }
    )
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });
})
}


const btn_api_call=document.getElementById('click')

btn_api_call.addEventListener('click',getCocktail);
