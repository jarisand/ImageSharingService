/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Database;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author jari
 */
@Entity
@Table(name = "IMAGE")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Image.findAll", query = "SELECT i FROM Image i"),
    @NamedQuery(name = "Image.findByIid", query = "SELECT i FROM Image i WHERE i.iid = :iid"),
    @NamedQuery(name = "Image.findByPath", query = "SELECT i FROM Image i WHERE i.path = :path"),
    @NamedQuery(name = "Image.findByFilesize", query = "SELECT i FROM Image i WHERE i.filesize = :filesize"),
    @NamedQuery(name = "Image.findByUploaddate", query = "SELECT i FROM Image i WHERE i.uploaddate = :uploaddate")})
public class Image implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "IID")
    private Integer iid;
    @Size(max = 50)
    @Column(name = "PATH")
    private String path;
    @Size(max = 50)
    @Column(name = "FILESIZE")
    private String filesize;
    @Column(name = "UPLOADDATE")
    @Temporal(TemporalType.DATE)
    private Date uploaddate;
    @JoinTable(name = "TAGS", joinColumns = {
        @JoinColumn(name = "IMAGE_TAG", referencedColumnName = "IID")}, inverseJoinColumns = {
        @JoinColumn(name = "TAG", referencedColumnName = "TID")})
    @ManyToMany
    private Collection<Tag> tagCollection;
    @OneToMany(mappedBy = "ratedImg")
    private Collection<Rate> rateCollection;
    @OneToMany(mappedBy = "commImg")
    private Collection<Comment> commentCollection;
    @JoinColumn(name = "UPLOADER", referencedColumnName = "UID")
    @ManyToOne
    private User uploader;

    public Image() {
    }

    public Image(Integer iid) {
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

    public String getFilesize() {
        return filesize;
    }

    public void setFilesize(String filesize) {
        this.filesize = filesize;
    }

    public Date getUploaddate() {
        return uploaddate;
    }

    public void setUploaddate(Date uploaddate) {
        this.uploaddate = uploaddate;
    }

    @XmlTransient
    public Collection<Tag> getTagCollection() {
        return tagCollection;
    }

    public void setTagCollection(Collection<Tag> tagCollection) {
        this.tagCollection = tagCollection;
    }

    @XmlTransient
    public Collection<Rate> getRateCollection() {
        return rateCollection;
    }

    public void setRateCollection(Collection<Rate> rateCollection) {
        this.rateCollection = rateCollection;
    }

    @XmlTransient
    public Collection<Comment> getCommentCollection() {
        return commentCollection;
    }

    public void setCommentCollection(Collection<Comment> commentCollection) {
        this.commentCollection = commentCollection;
    }

    public User getUploader() {
        return uploader;
    }

    public void setUploader(User uploader) {
        this.uploader = uploader;
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
        if (!(object instanceof Image)) {
            return false;
        }
        Image other = (Image) object;
        if ((this.iid == null && other.iid != null) || (this.iid != null && !this.iid.equals(other.iid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Database.Image[ iid=" + iid + " ]";
    }
    
}
