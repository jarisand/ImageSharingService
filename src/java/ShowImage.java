
import java.io.File;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author jari
 */
public class ShowImage {

    public static void main(String[] args) {

        File f = null;
        File[] paths;

        try {
            // create new file
            f = new File("/home/jari/uploads/");

            // returns pathnames for files and directory
            paths = f.listFiles();

            // for each pathname in pathname array
            for (File path : paths) {
                // prints file and directory paths
                System.out.println(path);
            }
        } catch (Exception e) {
            // if any error occurs
            e.printStackTrace();
        }
    }
}
