var mattress = [
  {
    size: 'SG-Single',
    geo: 'SG',
    type: 'single',
    sizeWidth: 91,
    sizeLength: 190,
    color: 'rgba( 237, 41, 57, 0.2)',
    source: 'https://www.hipvan.com/products/levitate-mattress'
  },
  {
    size: 'SG-Queen',
    geo: 'SG',
    type: 'queen',
    sizeWidth: 152,
    sizeLength: 190,
    color: 'rgba( 237, 41, 57, 0.2)',
    source: 'https://www.hipvan.com/products/levitate-mattress'
  },
  {
    size: 'SG-King',
    geo: 'SG',
    type: 'king',
    sizeWidth: 183,
    sizeLength: 190,
    color: 'rgba( 237, 41, 57, 0.2)',
    source: 'https://www.hipvan.com/products/levitate-mattress'
  },
  {
    size: 'Europe-Single',
    geo: 'Europe',
    type: 'single',
    sizeWidth: 90,
    sizeLength: 200,
    color: 'rgba( 0,51, 153,0.2)',
  },
  {
    size: 'Europe-Queen',
    geo: 'Europe',
    type: 'queen',
    sizeWidth: 160,
    sizeLength: 200,
    color: 'rgba( 0,51, 153,0.2)',
  },
  {
    size: 'Europe-King',
    geo: 'Europe',
    type: 'king',
    sizeWidth: 180,
    sizeLength: 200,
    color: 'rgba( 0,51, 153,0.2)',
  },
  {
    size: 'US-Single',
    geo: 'US',
    type: 'single',
    sizeWidth: 92,
    sizeLength: 203,
    color: 'rgba( 191,10,48,0.2 )'
  },
  {
    size: 'US-Queen',
    geo: 'US',
    type: 'queen',
    sizeWidth: 153,
    sizeLength: 203,
    color: 'rgba( 191,10,48,0.2 )',
  },
  {
    size: 'US-King',
    geo: 'US',
    type: 'king',
    sizeWidth: 183,
    sizeLength: 203,
    color: 'rgba( 191,10,48,0.2 )',
  },
  {
    size: 'US-California King',
    geo: 'US-California',
    type: 'king',
    sizeWidth: 183,
    sizeLength: 213,
    color: 'rgba( 191,10,48,0.2 )',
  },
]

let containerElement = document.querySelector( '#mattressContainer' )
let listingElement = document.querySelector( '#listing' )
let geoListingElement = document.querySelector( '#geo' )
let typeListingElement = document.querySelector( '#type' )

let createdGeo = []
let createdType = []

let mattressMax = {
  sizeWidth: false,
  sizeLength: false
}
// Create list of mattress
mattress.forEach( function( oneData ){
  let elementId = oneData.size.replace( ' ', '.' )
  oneData.elementId = elementId

  let thisMattress = document.createElement( 'div' )
  thisMattress.classList.add( 'oneSize' )
  thisMattress.classList.add( 'FBbox' )
  thisMattress.classList.add( 'FBboxAlignCenter' )
  thisMattress.classList.add( 'FBboxJustifyCenter' )
  thisMattress.classList.add( elementId )
  thisMattress.setAttribute( 'geo', oneData.geo )
  thisMattress.setAttribute( 'type', oneData.type )
  thisMattress.style.width = oneData.sizeWidth + 'px'
  thisMattress.style.height = oneData.sizeLength + 'px'
  thisMattress.style.backgroundColor = oneData.color
  containerElement.appendChild( thisMattress )

  let thisListing = document.createElement( 'li' )
  thisListing.classList.add( elementId )
  thisListing.setAttribute( 'mattressId', elementId )
  thisListing.innerText = oneData.size.replace( '-', ' ' ) + ' ' + mattressSizeText( oneData )
  listingElement.appendChild( thisListing )

  // Adjust container size Data
  if( !mattressMax.sizeWidth || mattressMax.sizeWidth < oneData.sizeWidth ) mattressMax.sizeWidth = oneData.sizeWidth
  if( !mattressMax.sizeLength || mattressMax.sizeLength < oneData.sizeLength ) mattressMax.sizeLength = oneData.sizeLength


  // Create Geo Listing
  if( !createdGeo.includes( oneData.geo ) ){
    createdGeo.push( oneData.geo )
    let thisGeo = document.createElement( 'li' )
    thisGeo.classList.add( oneData.geo )
    thisGeo.setAttribute( 'geo', oneData.geo )
    thisGeo.innerText = oneData.geo
    geoListingElement.appendChild( thisGeo )
  }

  // Create Type listing
  if( !createdType.includes( oneData.type ) ){
    createdType.push( oneData.type )
    let thisType = document.createElement( 'li' )
    thisType.classList.add( oneData.type )
    thisType.setAttribute( 'type', oneData.type )
    thisType.innerText = oneData.type
    typeListingElement.appendChild( thisType )
  }
} )
// Adjust container size
containerElement.style.width = mattressMax.sizeWidth + 'px'
containerElement.style.height = mattressMax.sizeLength + 'px'

// Selector of mattress
let listingElements = document.querySelectorAll( '#listing li' )
listingElements.forEach( function( oneListing ){
  oneListing.addEventListener( 'click', function( oneElement ){
    let targetId = oneElement.target.getAttribute( 'mattressId' )

    let targetMattressId = '.oneSize.' + targetId
    let targetMattress = document.querySelector( targetMattressId )
    // targetMattress.style.border = '3px solid red'

    highlightOne( targetId )
  } )
} )

function removeHighlight(){
  document.querySelectorAll( '.oneSize' ).forEach( function( oneSize ){
    oneSize.classList.remove( 'offHighlight' )
    oneSize.classList.remove( 'highlight' )
    oneSize.innerText = ''
  } )
}
function highlightOne( targetId ){
  removeHighlight()

  let elementData = mattress.find( function( one ){
    return one.elementId === targetId
  } )

  document.querySelectorAll( '.oneSize' ).forEach( function( oneSize ){
    if( !oneSize.classList.contains( targetId ) ){
      oneSize.classList.add( 'offHighlight' )
    }else{
      oneSize.classList.add( 'highlight' )
      oneSize.innerHTML = elementData.size + '<br>' + mattressSizeText( elementData )
    }
  } )
}


function mattressSizeText( data ){
  return data.sizeWidth + 'cm * ' + data.sizeLength + 'cm'
}



// Selector of Geo
let geoElements = document.querySelectorAll( '#geo li' )
geoElements.forEach( function( oneGeo ){
  oneGeo.addEventListener( 'click', function( oneGeoClickElement ){
    let clickedGeoId = oneGeoClickElement.target.getAttribute( 'geo' )
    console.log( 'clickedGeoId', clickedGeoId )
    highlightBy( 'geo', clickedGeoId )
  } )
} )

// Selector of Type
let typeElements = document.querySelectorAll( '#type li' )
typeElements.forEach( function( oneType ){
  oneType.addEventListener( 'click', function( oneTypeClickElement ){
    let clickedTypeId = oneTypeClickElement.target.getAttribute( 'type' )
    highlightBy( 'type', clickedTypeId )
  } )
} )


function highlightBy( attributeType, value ){
  removeHighlight()
  document.querySelectorAll( '.oneSize' ).forEach( function( oneSize ){
    let thisAttributeValue = oneSize.getAttribute( attributeType )
    if( thisAttributeValue === value ){
      oneSize.classList.add( 'highlight' )
    }else{
      oneSize.classList.add( 'offHighlight' )
    }
  } )
}
