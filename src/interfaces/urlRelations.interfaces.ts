export interface IPredicition{ 
    quantity: number,
    type: 'calculated' | 'extracted' | 'error' | 'predictedByDestination' | 'noOccurrence'
}

export interface ICalcPrediction{
    url: string,
    quantity: number
}