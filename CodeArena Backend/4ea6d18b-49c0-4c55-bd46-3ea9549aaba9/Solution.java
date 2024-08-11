import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Solution {
    public static void main(String[] args) {
        String filename = "input.txt"; // Name of the input file

        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line); // Process each line
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
