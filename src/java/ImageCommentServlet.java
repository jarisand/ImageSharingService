/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import DatabaseNew.Comment;
import DatabaseNew.Image;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;
import java.util.HashMap;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author jari
 */
@WebServlet(urlPatterns = {"/ImageCommentServlet"})
public class ImageCommentServlet extends HttpServlet {

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
    List<String> imgPathC = new ArrayList<String>();
    List<String> commentC = new ArrayList<String>();
    public HashMap<String, String> mappi = new HashMap<String, String>();
    int u;
    int j = 0;
   

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            try {
                emf = Persistence.createEntityManagerFactory("FileUploadPU");
                em = emf.createEntityManager();

                for (Comment i : (List<Comment>) em.createNamedQuery("Comment.findAll").getResultList()) {
                    //out.write("Comment.findAll");
                    imgPathC.add(i.getImagepath());
                    /**mappi.put(i.getImagepath(), i.getText());
                    
                    commentC.add(i.getText());*/
                    
                    
                }
                
                /**for(j = 0; j <= imgPathC.size(); j++){ 
                    this.mappi.put(imgPathC.get(j), commentC.get(j));
                }
               */
                String json = new Gson().toJson(imgPathC);
                out.write(json);
            } catch (Exception e) {
                System.out.println(e);
            } finally {
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
    }// </editor-fold>

}
