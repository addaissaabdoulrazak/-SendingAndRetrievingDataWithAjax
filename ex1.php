<?php
header ("Content-Type: text/xml");
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';

echo '<response>';

 $name = $_GET['name'];

 $tabhomme =["adda","issa","abdoul razak", "amavi", "ayité","moctar",];
 $tabfemme =["amina", "mariama","housseina","hassana",];
 if(in_array($name , $tabhomme))
 {
     echo  ' salut Grand Maitre ' .htmlentities($name);
 } 
  else if(in_array($name, $tabfemme))
  {
    echo ' salut Madame ' .htmlentities($name) ;
  }
   else if(trim($name) == '')
   {
       echo ' coucou etranger ! quel est votre nom ? ';
       
   }else{
       echo ' OMG '.($name) . ' je ne te connais pas!!!';
   }

echo ' </response> ';
?>