export interface IPredicition{ 
    quantity: number,
    type: 'calculated' | 'predicted' | 'error' | 'predictedByDestination'
}

export interface ICalcPrediction{
    url: string,
    quantity: number
}