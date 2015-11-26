/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import Database.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.OutputStream;
import java.util.ArrayList;
import javax.imageio.ImageIO;
import com.google.gson.Gson;

/**
 *
 * @author jari
 */
@WebServlet(urlPatterns = {"/ListImages"})
public class ListImages extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    EntityManager em;
    EntityManagerFactory emf;
    Image image;
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try(PrintWriter out = response.getWriter()) {
            try{
            emf = Persistence.createEntityManagerFactory("FileUploadPU");
            em = emf.createEntityManager();
            
            List<String> list = new ArrayList<String>();
            
            for(Image i : (List<Image>) em.createNamedQuery("Image.findAll").getResultList()){
                
                //out.println("<h2>" + i.getPath() + "</h2>");
                
              /*  File f = new File(i.getPath());
                BufferedImage bi = ImageIO.read(f);
                OutputStream out2 = response.getOutputStream();
                response.setContentType("image/jpeg");
                ImageIO.write(bi, "jpeg", out2);
                */
                //out.println(i.getPath());
                list.add(i.getPath());
                
            
            }
            
           /* for(int i=0; i <= list.size(); i++){
                    out.println("<figure><img src="+list.get(i)+"><figcaption></figcaption></figure><br>");
                    }*/
            
            String json = new Gson().toJson(list);
            
            out.write(json);
            
         
        } catch(Exception e){
                System.out.println(e);
        }
        finally{
            em.close();
            emf.close();
        }
    }
    }
            // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }
}



