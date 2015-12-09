/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DatabaseNew;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author jari
 */
@Entity
@Table(name = "COMMENTNEW")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Commentnew.findAll", query = "SELECT c FROM Commentnew c"),
    @NamedQuery(name = "Commentnew.findByCid", query = "SELECT c FROM Commentnew c WHERE c.cid = :cid"),
    @NamedQuery(name = "Commentnew.findByText", query = "SELECT c FROM Commentnew c WHERE c.text = :text"),
    @NamedQuery(name = "Commentnew.findByCommenter", query = "SELECT c FROM Commentnew c WHERE c.commenter = :commenter"),
    @NamedQuery(name = "Commentnew.findByPath", query = "SELECT c FROM Commentnew c WHERE c.path = :path")})
public class Commentnew implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "CID")
    private Integer cid;
    @Size(max = 255)
    @Column(name = "TEXT")
    private String text;
    @Size(max = 100)
    @Column(name = "COMMENTER")
    private String commenter;
    @Size(max = 100)
    @Column(name = "PATH")
    private String path;

    public Commentnew() {
    }

    public Commentnew(Integer cid) {
        this.cid = cid;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getCommenter() {
        return commenter;
    }

    public void setCommenter(String commenter) {
        this.commenter = commenter;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cid != null ? cid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Commentnew)) {
            return false;
        }
        Commentnew other = (Commentnew) object;
        if ((this.cid == null && other.cid != null) || (this.cid != null && !this.cid.equals(other.cid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "DatabaseNew.Commentnew[ cid=" + cid + " ]";
    }
    
}
