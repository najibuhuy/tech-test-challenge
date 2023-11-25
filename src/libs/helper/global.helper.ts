
import { ZodiacDto, HoroscopeDto } from "../dto/global.dto";

export const getAge = (birthDate: string) => {
    const today = new Date();
        const dob = new Date(birthDate);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
    return age
}

export const getZodiacHoroscope = (birthDate : string) => { 
    const dob = new Date(birthDate);
    const month = dob.getMonth()+1
    const day = dob.getDate()
    let zoho= {zodiac : null, horoscope : null}; 

    if (month == 12){ 
        if (day < 22) zoho = {zodiac : ZodiacDto.SAGITTARIUS, horoscope : HoroscopeDto.ARCHER}; 
        else zoho =  {zodiac : ZodiacDto.CAPRICORN, horoscope : HoroscopeDto.GOAT} 
    } 
    else if (month == 1){ 
        if (day < 20) zoho = {zodiac : ZodiacDto.CAPRICORN, horoscope : HoroscopeDto.GOAT} 
        else zoho = {zodiac : ZodiacDto.AQUARIUS, horoscope : HoroscopeDto.WATERBEARER} 
    }       
    else if (month == 2){ 
        if (day < 19) zoho = {zodiac : ZodiacDto.AQUARIUS, horoscope : HoroscopeDto.WATERBEARER}
        else zoho = {zodiac : ZodiacDto.PISCES, horoscope : HoroscopeDto.FISH}
    } 
            
    else if(month == 3){ 
        if (day < 21)  zoho = {zodiac : ZodiacDto.PISCES, horoscope : HoroscopeDto.FISH}
        else zoho = {zodiac : ZodiacDto.ARIES, horoscope : HoroscopeDto.RAM}
    } 
    else if (month == 4){ 
        if (day < 20)zoho = {zodiac : ZodiacDto.ARIES, horoscope : HoroscopeDto.RAM}
        else zoho = {zodiac : ZodiacDto.TAURUS, horoscope : HoroscopeDto.BULL}
    } 
            
    else if (month == 5){ 
        if (day < 21) zoho = {zodiac : ZodiacDto.TAURUS, horoscope : HoroscopeDto.BULL} 
        else zoho = {zodiac : ZodiacDto.GEMINI, horoscope : HoroscopeDto.TWINS} 
    } 
            
    else if( month == 6){ 
        if (day < 21) zoho = {zodiac : ZodiacDto.GEMINI, horoscope : HoroscopeDto.TWINS} 
        else zoho = {zodiac : ZodiacDto.CANCER, horoscope : HoroscopeDto.CRAB}  
    } 
            
    else if (month == 7){ 
        if (day < 23) zoho = {zodiac : ZodiacDto.CANCER, horoscope : HoroscopeDto.CRAB}   
        else zoho = {zodiac : ZodiacDto.LEO, horoscope : HoroscopeDto.LION}  
    } 
            
    else if( month == 8){ 
        if (day < 23) zoho = {zodiac : ZodiacDto.LEO, horoscope : HoroscopeDto.LION}  
        else zoho = zoho = {zodiac : ZodiacDto.VIRGO, horoscope : HoroscopeDto.VIRGIN}; 
    } 
            
    else if (month == 9){ 
        if (day < 23) zoho = zoho = {zodiac : ZodiacDto.VIRGO, horoscope : HoroscopeDto.VIRGIN};
        else zoho = {zodiac : ZodiacDto.LIBRA, horoscope : HoroscopeDto.BALANCE};
    } 
            
    else if (month == 10){ 
        if (day < 23) zoho = {zodiac : ZodiacDto.LIBRA, horoscope : HoroscopeDto.BALANCE};
        else zoho = {zodiac : ZodiacDto.SCORPIO, horoscope : HoroscopeDto.SCORPIO};
    } 
            
    else if (month == 11){ 
        if (day < 22) zoho = {zodiac : ZodiacDto.SCORPIO, horoscope : HoroscopeDto.SCORPIO}; 
        else zoho = {zodiac : ZodiacDto.SAGITTARIUS, horoscope : HoroscopeDto.ARCHER};  
    } 
    return zoho 
} 

