package com.rentacar.utilities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Helpers {

    public static String formatDate(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.format(date);
    }

    public static Date formatString(String stringDate) throws ParseException {
        return new SimpleDateFormat("yyyy-MM-dd").parse(stringDate);
    }

    public static int getNumberOfDays(Date dropOffDate, Date pickUpDate) throws ParseException {
//        Date pickUp = new SimpleDateFormat("yyyy-MM-dd").parse(pickUpDate);
//        Date dropOff = new SimpleDateFormat("yyyy-MM-dd").parse(dropOffDate);
        long diff = dropOffDate.getTime() - pickUpDate.getTime();
        float nDays = (diff / (1000*60*60*24));
        int days = (int) nDays + 1;

        return days;
    }

}
