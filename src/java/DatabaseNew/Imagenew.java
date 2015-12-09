/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DatabaseNew;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author jari
 */
@Entity
@Table(name = "IMAGENEW")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Imagenew.findAll", query = "SELECT i FROM Imagenew i"),
    @NamedQuery(name = "Imagenew.findByIid", query = "SELECT i FROM Imagenew i WHERE i.iid = :iid"),
    @NamedQuery(name = "Imagenew.findByPath", query = "SELECT i FROM Imagenew i WHERE i.path = :path"),
    @NamedQuery(name = "Imagenew.findByUploadername", query = "SELECT i FROM Imagenew i WHERE i.uploadername = :uploadername"),
    @NamedQuery(name = "Imagenew.findByUploaddate", query = "SELECT i FROM Imagenew i WHERE i.uploaddate = :uploaddate")})
public class Imagenew implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "IID")
    private Integer iid;
    @Size(max = 100)
    @Column(name = "PATH")
    private String path;
    @Size(max = 100)
    @Column(name = "UPLOADERNAME")
    private String uploadername;
    @Column(name = "UPLOADDATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date uploaddate;

    public Imagenew() {
    }

    public Imagenew(Integer iid) {
        this.iid = iid;
    }

    public Integer getIid() {
        return iid;
    }

    public void setIid(Integer iid) {
        this.iid = iid;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getUploadername() {
        return uploadername;
    }

    public void setUploadername(String uploadername) {
        this.uploadername = uploadername;
    }

    public Date getUploaddate() {
        return uploaddate;
    }

    public void setUploaddate(Date uploaddate) {
        this.uploaddate = uploaddate;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (iid != null ? iid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Imagenew)) {
            return false;
        }
        Imagenew other = (Imagenew) object;
        if ((this.iid == null && other.iid != null) || (this.iid != null && !this.iid.equals(other.iid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "DatabaseNew.Imagenew[ iid=" + iid + " ]";
    }
    
}
