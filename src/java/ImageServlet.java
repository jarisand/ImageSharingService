
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class ImageServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("image/jpeg");
        ServletOutputStream out;
        out = response.getOutputStream();
        FileInputStream flinp = new FileInputStream("/home/jari/uploads/mato.jpg");
        BufferedInputStream buffinp = new BufferedInputStream(flinp);
        BufferedOutputStream buffoup = new BufferedOutputStream(out);
        int ch = 0;
        while ((ch = buffinp.read()) != -1) {
            buffoup.write(ch);
        }
        buffinp.close();
        flinp.close();
        buffoup.close();
        out.close();
    }
}
